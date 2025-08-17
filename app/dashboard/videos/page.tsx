"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Play,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreVertical,
  Download,
  Share2,
  Edit3,
  Trash2,
  Eye,
  Clock,
  Video,
} from "lucide-react"

// Mock video data
const mockVideos = [
  {
    id: "1",
    title: "Product Demo Presentation",
    description: "Professional product demonstration video",
    avatarName: "Professional John",
    thumbnailUrl: "/business-avatar-presenting.png",
    videoUrl: "/mock-video-1.mp4",
    duration: 120,
    quality: "HD",
    status: "completed" as const,
    createdAt: "2024-01-15",
    viewCount: 45,
    isPublic: false,
  },
  {
    id: "2",
    title: "Creative Content Introduction",
    description: "Artistic introduction for social media",
    avatarName: "Creative Artist",
    thumbnailUrl: "/artistic-avatar.png",
    videoUrl: "/mock-video-2.mp4",
    duration: 90,
    quality: "4K",
    status: "completed" as const,
    createdAt: "2024-01-12",
    viewCount: 128,
    isPublic: true,
  },
  {
    id: "3",
    title: "Educational Tutorial",
    description: "Step-by-step learning content",
    avatarName: "Teacher Mode",
    thumbnailUrl: "/friendly-teacher-avatar.png",
    videoUrl: "/mock-video-3.mp4",
    duration: 300,
    quality: "HD",
    status: "processing" as const,
    createdAt: "2024-01-10",
    viewCount: 0,
    isPublic: false,
  },
  {
    id: "4",
    title: "Gaming Stream Intro",
    description: "High-energy gaming introduction",
    avatarName: "Gaming Streamer",
    thumbnailUrl: "/gaming-avatar-neon.png",
    videoUrl: "/mock-video-4.mp4",
    duration: 60,
    quality: "4K",
    status: "completed" as const,
    createdAt: "2024-01-08",
    viewCount: 89,
    isPublic: true,
  },
]

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredVideos = mockVideos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || video.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "title":
        return a.title.localeCompare(b.title)
      case "views":
        return b.viewCount - a.viewCount
      default:
        return 0
    }
  })

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-sans text-3xl font-bold">Video Library</h1>
            <p className="font-serif text-muted-foreground">Manage and organize your AI-generated videos</p>
          </div>
          <Button className="font-serif bg-gradient-to-r from-primary to-accent" asChild>
            <a href="/dashboard/videos/create">
              <Plus className="w-4 h-4 mr-2" />
              Create Video
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-sans text-2xl font-bold">{mockVideos.length}</p>
                  <p className="font-serif text-xs text-muted-foreground">Total Videos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-accent" />
                <div>
                  <p className="font-sans text-2xl font-bold">
                    {mockVideos.reduce((sum, video) => sum + video.viewCount, 0)}
                  </p>
                  <p className="font-serif text-xs text-muted-foreground">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-500" />
                <div>
                  <p className="font-sans text-2xl font-bold">
                    {Math.floor(mockVideos.reduce((sum, video) => sum + video.duration, 0) / 60)}m
                  </p>
                  <p className="font-serif text-xs text-muted-foreground">Total Duration</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Share2 className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="font-sans text-2xl font-bold">{mockVideos.filter((video) => video.isPublic).length}</p>
                  <p className="font-serif text-xs text-muted-foreground">Public Videos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 font-serif"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 font-serif">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-serif">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 font-serif">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-serif">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Grid/List */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {sortedVideos.map((video) => (
            <Card key={video.id} className="group hover:shadow-lg transition-all duration-200">
              {viewMode === "grid" ? (
                <>
                  <div className="relative aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={video.thumbnailUrl || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />

                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-slate-900 ml-1" />
                      </div>
                    </div>

                    {/* Status and duration */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge
                        variant={video.status === "completed" ? "default" : "secondary"}
                        className="font-serif text-xs"
                      >
                        {video.status === "processing" ? "Processing..." : video.quality}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 right-3">
                      <Badge variant="outline" className="font-serif text-xs bg-black/50 text-white border-white/20">
                        {formatDuration(video.duration)}
                      </Badge>
                    </div>

                    {/* Action menu */}
                    <div className="absolute top-3 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-8 h-8 p-0 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="font-serif">
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" />
                            Play Video
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit3 className="w-4 h-4 mr-2" />
                            Edit Video
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
                  </div>

                  <div className="p-4">
                    <h3 className="font-sans font-semibold text-lg mb-1 line-clamp-1">{video.title}</h3>
                    <p className="font-serif text-sm text-muted-foreground mb-2 line-clamp-2">{video.description}</p>
                    <p className="font-serif text-xs text-muted-foreground mb-3">Avatar: {video.avatarName}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span className="font-serif">{video.viewCount} views</span>
                      </div>
                      <span className="font-serif">{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4 flex items-center space-x-4">
                  <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img
                      src={video.thumbnailUrl || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-sans font-semibold text-lg truncate">{video.title}</h3>
                      <Badge
                        variant={video.status === "completed" ? "default" : "secondary"}
                        className="font-serif text-xs"
                      >
                        {video.status === "processing" ? "Processing..." : video.quality}
                      </Badge>
                    </div>
                    <p className="font-serif text-sm text-muted-foreground mb-2 line-clamp-1">{video.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-serif">{video.avatarName}</span>
                      <span className="font-serif">{formatDuration(video.duration)}</span>
                      <span className="font-serif">{video.viewCount} views</span>
                      <span className="font-serif">{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="font-serif">
                      <DropdownMenuItem>
                        <Play className="w-4 h-4 mr-2" />
                        Play Video
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Video
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
              )}
            </Card>
          ))}
        </div>

        {sortedVideos.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-sans text-lg font-semibold mb-2">No videos found</h3>
              <p className="font-serif text-muted-foreground mb-4">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first AI video to get started"}
              </p>
              <Button asChild>
                <a href="/dashboard/videos/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Video
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
