"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Video,
  Crown,
  Sparkles,
  MoreVertical,
  Play,
  Download,
  Share2,
  Trash2,
  Edit3,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const mockUser = {
  id: "1",
  email: "user@example.com",
  fullName: "John Doe",
  avatarUrl: "/placeholder.svg?height=40&width=40",
  subscriptionTier: "pro" as const,
  subscriptionStatus: "active" as const,
  creditsRemaining: 47,
  totalCredits: 100,
}

const mockAvatars = [
  {
    id: "1",
    name: "Professional John",
    description: "Business presentation avatar with professional attire and confident posture",
    avatarUrl: "/business-avatar-presenting.png",
    style: "realistic",
    generationStatus: "completed" as const,
    isPublic: false,
    createdAt: "2024-01-15",
    videoCount: 3,
    lastUsed: "2024-01-20",
    popularity: 85,
  },
  {
    id: "2",
    name: "Creative Artist",
    description: "Artistic expression avatar with vibrant colors and creative styling",
    avatarUrl: "/artistic-avatar.png",
    style: "stylized",
    generationStatus: "completed" as const,
    isPublic: true,
    createdAt: "2024-01-12",
    videoCount: 7,
    lastUsed: "2024-01-19",
    popularity: 92,
  },
  {
    id: "3",
    name: "Teacher Mode",
    description: "Educational content avatar with friendly and approachable appearance",
    avatarUrl: "/friendly-teacher-avatar.png",
    style: "friendly",
    generationStatus: "processing" as const,
    isPublic: false,
    createdAt: "2024-01-10",
    videoCount: 0,
    lastUsed: null,
    popularity: 0,
  },
  {
    id: "4",
    name: "Gaming Streamer",
    description: "High-energy gaming avatar with neon effects and modern styling",
    avatarUrl: "/gaming-avatar-neon.png",
    style: "futuristic",
    generationStatus: "completed" as const,
    isPublic: true,
    createdAt: "2024-01-08",
    videoCount: 12,
    lastUsed: "2024-01-21",
    popularity: 96,
  },
]

export default function DashboardPage() {
  const [selectedAvatars, setSelectedAvatars] = useState<string[]>([])
  const [realtimeStats, setRealtimeStats] = useState({
    activeUsers: 1247,
    videosToday: 89,
    processingQueue: 3,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        videosToday: prev.videosToday + Math.floor(Math.random() * 3),
        processingQueue: Math.max(0, prev.processingQueue + Math.floor(Math.random() * 3) - 1),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatars((prev) => (prev.includes(avatarId) ? prev.filter((id) => id !== avatarId) : [...prev, avatarId]))
  }

  const totalVideos = mockAvatars.reduce((sum, avatar) => sum + avatar.videoCount, 0)
  const completedAvatars = mockAvatars.filter((a) => a.generationStatus === "completed").length

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-2">
          <div className="space-y-1">
            <h1 className="font-sans text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Welcome back, {mockUser.fullName}
            </h1>
            <p className="font-serif text-muted-foreground text-lg">
              Create stunning AI avatars and generate professional videos
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard/create-avatar">
              <Button
                size="lg"
                className="font-serif bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Avatar
              </Button>
            </Link>
            <Link href="/dashboard/create-video">
              <Button variant="outline" size="lg" className="font-serif bg-background/50 backdrop-blur-sm border-2">
                <Video className="w-5 h-5 mr-2" />
                Generate Video
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-serif text-sm font-medium">Total Avatars</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-sans text-3xl font-bold">{mockAvatars.length}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <p className="font-serif text-xs text-green-600">+{completedAvatars} ready</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-serif text-sm font-medium">Videos Created</CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Video className="h-5 w-5 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-sans text-3xl font-bold">{totalVideos}</div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3 text-orange-600" />
                <p className="font-serif text-xs text-orange-600">{realtimeStats.videosToday} today</p>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-serif text-sm font-medium">Credits Remaining</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Crown className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-sans text-3xl font-bold">{mockUser.creditsRemaining}</div>
              <Progress value={(mockUser.creditsRemaining / mockUser.totalCredits) * 100} className="mt-2 h-2" />
              <p className="font-serif text-xs text-muted-foreground mt-1">
                {mockUser.totalCredits - mockUser.creditsRemaining} used this month
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-serif text-sm font-medium">Platform Status</CardTitle>
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="font-sans text-3xl font-bold">{realtimeStats.activeUsers.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="font-serif text-xs text-green-600">{realtimeStats.processingQueue} in queue</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-background/50">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="font-sans text-2xl flex items-center gap-2">
                  Your Avatar Collection
                  <Badge variant="secondary" className="font-serif text-xs">
                    {mockAvatars.length} total
                  </Badge>
                </CardTitle>
                <CardDescription className="font-serif text-base">
                  Manage your AI-generated avatars and create engaging content
                </CardDescription>
              </div>
              {selectedAvatars.length > 0 && (
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-serif px-3 py-1">
                    {selectedAvatars.length} selected
                  </Badge>
                  <Button variant="destructive" size="sm" className="font-serif">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Selected
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockAvatars.map((avatar) => (
                <Card
                  key={avatar.id}
                  className={`group relative cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                    selectedAvatars.includes(avatar.id)
                      ? "ring-2 ring-primary shadow-lg scale-[1.02]"
                      : "hover:shadow-xl"
                  }`}
                  onClick={() => handleAvatarSelect(avatar.id)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={avatar.avatarUrl || "/placeholder.svg"}
                      alt={avatar.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Enhanced status overlay */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge
                        variant={avatar.generationStatus === "completed" ? "default" : "secondary"}
                        className="font-serif text-xs shadow-lg backdrop-blur-sm"
                      >
                        {avatar.generationStatus === "processing" ? (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                            Processing
                          </div>
                        ) : (
                          "Ready"
                        )}
                      </Badge>
                    </div>

                    {/* Public indicator and popularity */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      {avatar.isPublic && (
                        <Badge variant="outline" className="font-serif text-xs bg-white/90 backdrop-blur-sm">
                          Public
                        </Badge>
                      )}
                      {avatar.popularity > 0 && (
                        <Badge variant="secondary" className="font-serif text-xs bg-white/90 backdrop-blur-sm">
                          {avatar.popularity}% ❤️
                        </Badge>
                      )}
                    </div>

                    {/* Enhanced action menu */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-9 h-9 p-0 bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="font-serif w-48">
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" />
                            Create Video
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Avatar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-sans font-semibold text-lg mb-1 line-clamp-1">{avatar.name}</h3>
                      <p className="font-serif text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {avatar.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="font-serif flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          {avatar.videoCount}
                        </span>
                        <span className="font-serif">{new Date(avatar.createdAt).toLocaleDateString()}</span>
                      </div>
                      {avatar.lastUsed && (
                        <Badge variant="outline" className="font-serif text-xs">
                          Recent
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              <Link href="/dashboard/create-avatar">
                <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:-translate-y-1">
                  <div className="aspect-[3/4] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Plus className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-sans font-semibold text-lg mb-2">Create New Avatar</h3>
                    <p className="font-serif text-sm text-muted-foreground leading-relaxed">
                      Upload a photo or describe your ideal avatar to get started
                    </p>
                  </div>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
