"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Video,
  Image,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Crown,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { getCurrentUser, type User } from "@/lib/auth"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/auth/signin")
        return
      }
      // In a real app, check if user is admin
      setUser(currentUser)
    }
    loadUser()
  }, [router])

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalAvatars: 3456,
    totalVideos: 2134,
    monthlyRevenue: 45670,
    conversionRate: 12.5,
  }

  const mockUsers = [
    {
      id: "1",
      email: "john@example.com",
      fullName: "John Doe",
      subscriptionTier: "pro",
      subscriptionStatus: "active",
      creditsRemaining: 25,
      createdAt: "2024-01-15",
      lastActive: "2024-01-20",
    },
    {
      id: "2",
      email: "sarah@example.com",
      fullName: "Sarah Smith",
      subscriptionTier: "business",
      subscriptionStatus: "active",
      creditsRemaining: 150,
      createdAt: "2024-01-10",
      lastActive: "2024-01-19",
    },
    {
      id: "3",
      email: "mike@example.com",
      fullName: "Mike Johnson",
      subscriptionTier: "free",
      subscriptionStatus: "active",
      creditsRemaining: 2,
      createdAt: "2024-01-18",
      lastActive: "2024-01-18",
    },
  ]

  const mockAvatars = [
    {
      id: "1",
      name: "Professional Sarah",
      userId: "1",
      userEmail: "john@example.com",
      style: "Corporate",
      status: "completed",
      isPublic: false,
      createdAt: "2024-01-16",
    },
    {
      id: "2",
      name: "Creative Alex",
      userId: "2",
      userEmail: "sarah@example.com",
      style: "Artistic",
      status: "completed",
      isPublic: true,
      createdAt: "2024-01-15",
    },
  ]

  const mockVideos = [
    {
      id: "1",
      title: "Product Demo",
      userId: "1",
      userEmail: "john@example.com",
      avatarName: "Professional Sarah",
      duration: 120,
      quality: "HD",
      status: "completed",
      viewCount: 45,
      createdAt: "2024-01-17",
    },
    {
      id: "2",
      title: "Welcome Message",
      userId: "2",
      userEmail: "sarah@example.com",
      avatarName: "Creative Alex",
      duration: 60,
      quality: "4K",
      status: "completed",
      viewCount: 23,
      createdAt: "2024-01-16",
    },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
              </div>
              <div>
                <span className="font-sans font-bold text-2xl bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  Admin Panel
                </span>
                <p className="font-serif text-sm text-slate-600">OmniAvatar Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search users, avatars, videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 font-serif"
                />
              </div>
              <Button variant="outline" onClick={() => router.push("/dashboard")} className="font-serif">
                User Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="font-serif">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="font-serif">
              Users
            </TabsTrigger>
            <TabsTrigger value="avatars" className="font-serif">
              Avatars
            </TabsTrigger>
            <TabsTrigger value="videos" className="font-serif">
              Videos
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-serif">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="font-sans text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-sans">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground font-serif">
                    <span className="text-green-600">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="font-sans text-sm font-medium">Active Users</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-sans">{stats.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground font-serif">
                    <span className="text-green-600">+8%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="font-sans text-sm font-medium">Total Avatars</CardTitle>
                  <Image className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-sans">{stats.totalAvatars.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground font-serif">
                    <span className="text-green-600">+25%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="font-sans text-sm font-medium">Total Videos</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-sans">{stats.totalVideos.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground font-serif">
                    <span className="text-green-600">+18%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="font-sans text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-sans">${stats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground font-serif">
                    <span className="text-green-600">+15%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="font-sans text-sm font-medium">Conversion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-sans">{stats.conversionRate}%</div>
                  <p className="text-xs text-muted-foreground font-serif">
                    <span className="text-green-600">+2.1%</span> from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Recent Activity</CardTitle>
                <CardDescription className="font-serif">Latest user actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New user registered", user: "john@example.com", time: "2 minutes ago" },
                    { action: "Avatar generated", user: "sarah@example.com", time: "5 minutes ago" },
                    { action: "Video created", user: "mike@example.com", time: "12 minutes ago" },
                    { action: "Subscription upgraded", user: "jane@example.com", time: "1 hour ago" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                    >
                      <div>
                        <p className="font-serif text-sm font-medium">{activity.action}</p>
                        <p className="font-serif text-xs text-slate-500">{activity.user}</p>
                      </div>
                      <span className="font-serif text-xs text-slate-400">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">User Management</CardTitle>
                <CardDescription className="font-serif">Manage user accounts and subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-serif">User</TableHead>
                      <TableHead className="font-serif">Subscription</TableHead>
                      <TableHead className="font-serif">Status</TableHead>
                      <TableHead className="font-serif">Credits</TableHead>
                      <TableHead className="font-serif">Joined</TableHead>
                      <TableHead className="font-serif">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-serif font-medium">{user.fullName}</p>
                            <p className="font-serif text-sm text-slate-500">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.subscriptionTier === "free" ? "secondary" : "default"}
                            className="font-serif"
                          >
                            {user.subscriptionTier === "business" && <Crown className="w-3 h-3 mr-1" />}
                            {user.subscriptionTier}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.subscriptionStatus === "active" ? "default" : "destructive"}
                            className="font-serif"
                          >
                            {user.subscriptionStatus === "active" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            {user.subscriptionStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-serif">{user.creditsRemaining}</TableCell>
                        <TableCell className="font-serif">{user.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem className="font-serif">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-serif">
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="avatars" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Avatar Management</CardTitle>
                <CardDescription className="font-serif">Monitor and moderate user-generated avatars</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-serif">Avatar</TableHead>
                      <TableHead className="font-serif">User</TableHead>
                      <TableHead className="font-serif">Style</TableHead>
                      <TableHead className="font-serif">Status</TableHead>
                      <TableHead className="font-serif">Visibility</TableHead>
                      <TableHead className="font-serif">Created</TableHead>
                      <TableHead className="font-serif">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAvatars.map((avatar) => (
                      <TableRow key={avatar.id}>
                        <TableCell className="font-serif font-medium">{avatar.name}</TableCell>
                        <TableCell className="font-serif">{avatar.userEmail}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-serif">
                            {avatar.style}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" className="font-serif">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {avatar.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={avatar.isPublic ? "default" : "secondary"} className="font-serif">
                            {avatar.isPublic ? "Public" : "Private"}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-serif">{avatar.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem className="font-serif">
                                <Eye className="w-4 h-4 mr-2" />
                                View Avatar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-serif">
                                <Ban className="w-4 h-4 mr-2" />
                                Hide Avatar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Video Management</CardTitle>
                <CardDescription className="font-serif">Monitor video generation and usage</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-serif">Title</TableHead>
                      <TableHead className="font-serif">User</TableHead>
                      <TableHead className="font-serif">Avatar</TableHead>
                      <TableHead className="font-serif">Duration</TableHead>
                      <TableHead className="font-serif">Quality</TableHead>
                      <TableHead className="font-serif">Views</TableHead>
                      <TableHead className="font-serif">Created</TableHead>
                      <TableHead className="font-serif">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVideos.map((video) => (
                      <TableRow key={video.id}>
                        <TableCell className="font-serif font-medium">{video.title}</TableCell>
                        <TableCell className="font-serif">{video.userEmail}</TableCell>
                        <TableCell className="font-serif">{video.avatarName}</TableCell>
                        <TableCell className="font-serif">{video.duration}s</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-serif">
                            {video.quality}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-serif">{video.viewCount}</TableCell>
                        <TableCell className="font-serif">{video.createdAt}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem className="font-serif">
                                <Eye className="w-4 h-4 mr-2" />
                                View Video
                              </DropdownMenuItem>
                              <DropdownMenuItem className="font-serif">
                                <Ban className="w-4 h-4 mr-2" />
                                Remove Video
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Usage Analytics</CardTitle>
                  <CardDescription className="font-serif">Platform usage metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm">Avatar Generations</span>
                      <span className="font-serif text-sm font-medium">2,456 this month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm">Video Generations</span>
                      <span className="font-serif text-sm font-medium">1,234 this month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm">API Calls</span>
                      <span className="font-serif text-sm font-medium">45,678 this month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm">Storage Used</span>
                      <span className="font-serif text-sm font-medium">2.4 TB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Revenue Analytics</CardTitle>
                  <CardDescription className="font-serif">Financial performance and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm">Free Users</span>
                      <span className="font-serif text-sm font-medium">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm">Creator Plan</span>
                      <span className="font-serif text-sm font-medium">20%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm">Pro Plan</span>
                      <span className="font-serif text-sm font-medium">12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm">Business Plan</span>
                      <span className="font-serif text-sm font-medium">3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
