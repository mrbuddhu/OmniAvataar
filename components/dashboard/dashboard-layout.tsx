"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Sparkles,
  Video,
  Settings,
  CreditCard,
  Users,
  BarChart3,
  LogOut,
  Crown,
  Menu,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Avatars",
    href: "/dashboard/avatars",
    icon: Sparkles,
  },
  {
    name: "Videos",
    href: "/dashboard/videos",
    icon: Video,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Community",
    href: "/dashboard/community",
    icon: Users,
  },
]

const mockUser = {
  fullName: "John Doe",
  email: "john@example.com",
  avatarUrl: "/placeholder.svg?height=32&width=32",
  subscriptionTier: "pro" as const,
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="border-b border-border p-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
              </div>
              <span className="font-sans font-bold text-lg bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                OmniAvatar
              </span>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-serif"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <div className="mt-8 p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="w-4 h-4 text-primary" />
                <span className="font-serif text-sm font-medium">Pro Plan</span>
              </div>
              <p className="font-serif text-xs text-muted-foreground mb-3">
                Unlock unlimited avatars and premium features
              </p>
              <Button size="sm" className="w-full font-serif text-xs">
                Upgrade Plan
              </Button>
            </div>
          </SidebarContent>

          <SidebarFooter className="border-t border-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={mockUser.avatarUrl || "/placeholder.svg"} alt={mockUser.fullName} />
                      <AvatarFallback className="font-sans text-xs">
                        {mockUser.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-serif text-sm font-medium">{mockUser.fullName}</p>
                      <p className="font-serif text-xs text-muted-foreground">{mockUser.email}</p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 font-serif">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-6">
              <SidebarTrigger className="md:hidden">
                <Menu className="w-5 h-5" />
              </SidebarTrigger>
              <div className="ml-auto flex items-center space-x-4">
                <Badge variant="secondary" className="font-serif">
                  47 credits remaining
                </Badge>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
