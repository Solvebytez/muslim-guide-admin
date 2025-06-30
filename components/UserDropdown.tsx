'use client'
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, LogOut, CreditCard, Mail } from 'lucide-react';
import { UserType } from '@/hooks/useGetUser';
import axiosInstance from '@/lib/axiosInstance';

export default function UserDropdown({user}:{user:UserType}) {
    const [error, setError] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleLogout = async () => {
    setError("");
    setIsLoading(true);
    try {    

      const response = await axiosInstance.post("/logout");
      console.log(response);
      if (response.status === 200) {
        if(typeof window !== 'undefined') {
            window.location.href = "/login"
        }
      } else {
        setError("Something went wrong");
      }
    } catch (error: any) {
      console.log(error);
      console.error("Login error:", error?.response?.data || error.message);
      setError("Something went wrong");
    }finally{
        setIsLoading(false);
    }

  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
       
        <button className="flex items-center space-x-4 bg-slate-400/25 rounded-full h-8 w-8 justify-center hover:bg-slate-400/40 transition-colors">           
          <Avatar className="h-5 w-5">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
       
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out {isLoading? "..." : ""} </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}