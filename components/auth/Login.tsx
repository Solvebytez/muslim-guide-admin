"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, LoginValueProps } from "@/lib/validation";
import { PasswordInput } from "./Form/PasswordInput";
import axiosInstance from "@/lib/axiosInstance";
import React from "react";
import encodeJwt from "@/utils/jwtencode";

function Login() {
  const [error, setError] = React.useState("");
  const form = useForm<LoginValueProps>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "muslimguide7@gmail.com",
      password: "Changeit@123",
    },
  });

  const handleSubmit = async (value: LoginValueProps) => {
    setError("");
    try {
      const jwtToken = await encodeJwt({
        email: value.email,
        adminToken: process.env.NEXT_PUBLIC_ADMIN_TOKEN,
      });

      const response = await axiosInstance.post("/admin-login", {
        email: value.email,
        password: value.password,
        adminToken: jwtToken,
      });
      console.log(response);
      if (response.status === 200) {
        if(typeof window !== 'undefined') {

            // window.location.href = "/dashboard"
        }
      } else {
        setError("Something went wrong");
      }
    } catch (error: any) {
      console.log(error);
      console.error("Login error:", error?.response?.data || error.message);
      setError("Something went wrong");
    }
    console.log(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              {/* <span className="text-xl font-semibold">Muslim guide</span> */}
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Muslim guide</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput placeholder="*********" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <Label htmlFor="remember" className="text-xs">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full flex justify-center items-center"
              >
                Sign In{" "}
                {form.formState.isSubmitting && (
                  <span className="animate-spin ml-1">🔄</span>
                )}
              </Button>
              {error && <p className="text-red-600 text-center">{error}</p>}
              {/* <div className="text-center text-sm text-gray-600">
                {"Don't have an account? "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </div> */}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
