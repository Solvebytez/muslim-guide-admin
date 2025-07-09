


import axiosInstance from "@/lib/axiosInstance"
import { useCallback, useEffect, useState } from "react"

// Define the UserType interface
export interface UserType {
  _id: string;
  email: string;
  name: string;
  provider: 'local' | 'google' | 'facebook'; // Extend as needed
  role: 'admin' | 'user' | 'moderator'; // Extend as needed
  status: 'active' | 'inactive' | 'banned'; // Extend as needed
  isVerified: boolean;
  createdAt: string; // ISO string, or use `Date` if parsed
  updatedAt: string; // ISO string, or use `Date` if parsed
  __v: number;
}


export const useGetuser = () => {
  const [isLoding, setIsLoding] = useState(true)
  const [user, setUser] = useState<UserType | null>(null)
  const [shouldRefetch, setIsRefetch] = useState(false)

  const getUser = useCallback(async () => {
    setIsLoding(true)
    try {
      const response = await axiosInstance.get("/get-user")
      console.log("User response:", response.data)

      if (response.status === 200) {
        const userData = response.data.data
        console.log("User role:", userData.role) // Debug log

        setUser(userData)
      
      }

      if (response.status === 401) {
        console.log("401 - Unauthorized")       
        setUser(null)
      }
    } catch (error:any) {
      console.error("Error fetching user:", error)
      //  if (error.status === 401) {
      //   console.log("401 - Unauthorized")
      //   if(typeof window !== 'undefined') {
      //     window.location.href = "/login"
      //   }
      //   setUser(null)
      // }
      setUser(null)
    } finally {
      setIsLoding(false)
    }
  }, [])

  useEffect(() => {
    getUser()
    return () => setIsRefetch(false)
  }, [getUser, shouldRefetch])

  const refetch = () => setIsRefetch(true)

  return { user, isLoding, refetch }
}
