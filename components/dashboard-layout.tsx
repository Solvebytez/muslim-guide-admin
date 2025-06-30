"use client"

import * as React from "react"
import Link from "next/link"

import { MessageCircleQuestion,HandPlatter,UserCog   } from 'lucide-react';


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Zap,
  Square,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useGetuser } from "@/hooks/useGetUser"
import UserDropdown from "./UserDropdown"
import { usePathname } from "next/navigation"

const navigationData = {
  home: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
   
  ],
  Users: [
    {
      title: "Users",
      url: "/activeuser",     
    },
   
  ],
  utilities: [
    {
      title: "Autocomplete",
      url: "/autocomplete",
      icon: Zap,
    },
    {
      title: "Buttons",
      url: "/buttons",
      icon: Square,
    },
  ],
  Resturent:[
    {
      title: "Pending",
      url: "/resturent/pendingresturent",
      icon: Square,
    },
    {
      title: "Approved",
      url: "/resturent/approvedresturent",
      icon: Square,
    },
    {
      title: "Rejected",
      url: "/resturent/rejectedresturent",
      icon: Square,
    }
  ],
  Support:[
    {
      title: "Support",
      url: "/support",
      icon: Square,
    },
   
  ]
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [frontendPagesOpen, setFrontendPagesOpen] = React.useState(true)
  const [resturentPageOpen, setResturentPagesOpen] = React.useState(true)
   const { user, isLoding, refetch } = useGetuser()
   const pathname = usePathname()

  if (isLoding) return <div>Loading...</div>

  console.log("pathname",pathname)


  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader className="border-b px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-semibold">Muslim Guide</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-4 gap-0">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              HOME
            </SidebarGroupLabel>
            <SidebarGroupContent className="gap-1">
              <SidebarMenu>
                {navigationData.home.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="w-full justify-start">
                      <Link
                        href={item.url}
                        className={
                          pathname === item.url
                            ? "flex items-center space-x-3 px-3 py-2 w-full bg-blue-50 text-blue-700"
                            : "flex items-center space-x-3 px-3 py-2 w-full text-gray-600"
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1">{item.title}</span>
                       
                       
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="mt-0">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setFrontendPagesOpen(!frontendPagesOpen)}
                    className="w-full justify-start bg-slate-200/30 text-zinc-900"
                  >
                    <div className="flex items-center space-x-3 px-3 py-2 w-full">
                      <UserCog className="h-4 w-4 fill-current" />
                      <span className="flex-1 font-medium">Users</span>
                      {frontendPagesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {frontendPagesOpen && (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationData.Users.map((item:any) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className="w-full justify-start ml-4">
                        <Link
                          href={item.url}
                          className={
                          pathname === item.url
                            ? "flex items-center space-x-3 px-3 py-2 w-full bg-blue-50 text-blue-700"
                            : "flex items-center space-x-3 px-3 py-2 w-full text-gray-600"
                        }
                        >
                          <div className="w-2 h-2 rounded-full border border-gray-400" />
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

           <SidebarGroup className="mt-0">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setResturentPagesOpen(!resturentPageOpen)}
                    className="w-full justify-start bg-slate-200/30 text-zinc-900"
                  >
                    <div className="flex items-center space-x-3 px-3 py-2 w-full">
                      <HandPlatter className="h-4 w-4 fill-current" />
                      <span className="flex-1 font-medium">Resturant</span>
                      {resturentPageOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

{resturentPageOpen && (
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationData.Resturent.map((item:any) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className="w-full justify-start ml-4">
                        <Link
                          href={item.url}
                          className={
                          pathname === item.url
                            ? "flex items-center space-x-3 px-3 py-2 w-full bg-blue-50 text-blue-700"
                            : "flex items-center space-x-3 px-3 py-2 w-full text-gray-600"
                        }
                        >
                          <div className="w-2 h-2 rounded-full border border-gray-400" />
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          <SidebarGroup className="mt-0">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                   
                    className="w-full justify-start bg-slate-200/30 text-zinc-900"
                  >
                    <div className="flex items-center space-x-3 px-3 py-2 w-full">
                      <MessageCircleQuestion className="h-4 w-4 fill-current" />
                     
                      <Link href="/support">
                      <span className="flex-1 font-medium">Support & Help</span>
                      </Link>
                     
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>


      
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
          <div className="flex items-center space-x-4">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full" />
            </div>
          </div>
          {
            user && <UserDropdown user={user} />
          }
          
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
