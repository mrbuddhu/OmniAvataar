"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Grid3X3, List, Plus, SortAsc, Eye, EyeOff } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Extended mock data for avatar management
const mockAvatars = [
  {
    id: "1",
    name: "Professional John",
    description: "Business presentation avatar with formal attire",
    avatarUrl: "/business-avatar-presenting.png",
    style: "realistic",
    generationStatus: "completed" as const,
    isPublic: false,
    createdAt: "2024-01-15",
    videoCount: 3,
    category: "Business",
  },
  {
    id: "2",
    name: "Creative Artist",
    description: "Artistic expression avatar with vibrant colors",
    avatarUrl: "/artistic-avatar.png",
    style: "stylized",
    generationStatus: "completed" as const,
    isPublic: true,
    createdAt: "2024-01-12",
    videoCount: 7,
    category: "Creative",
  },
  {
    id: "3",
    name: "Teacher Mode",
    description: "Educational content avatar with friendly appearance",
    avatarUrl: "/friendly-teacher-avatar.png",
    style: "friendly",
    generationStatus: "processing" as const,
    isPublic: false,
    createdAt: "2024-01-10",
    videoCount: 0,
    category: "Education",
  },
  {
    id: "4",
    name: "Gaming Streamer",
    description: "High-energy gaming avatar with neon aesthetics",
    avatarUrl: "/gaming-avatar-neon.png",
    style: "energetic",
    generationStatus: "completed" as const,
    isPublic: true,
    createdAt: "2024-01-08",
    videoCount: 12,
    category: "Gaming",
  },
  {
    id: "5",
    name: "Marketing Pro",
    description: "Professional marketing avatar for product demos",
    avatarUrl: "/marketing-avatar-product.png",
    style: "professional",
    generationStatus: "completed" as const,
    isPublic: false,
    createdAt: "2024-01-05",
    videoCount: 5,
    category: "Marketing",
  },
]

export default function AvatarsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredAvatars = mockAvatars.filter((avatar) => {
    const matchesSearch =
      avatar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avatar.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || avatar.generationStatus === filterStatus
    return matchesSearch && matchesStatus
  })

  const sortedAvatars = [...filteredAvatars].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "name":
        return a.name.localeCompare(b.name)
      case "videos":
        return b.videoCount - a.videoCount
      default:
        return 0
    }
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-sans text-3xl font-bold">Avatar Management</h1>
            <p className="font-serif text-muted-foreground">Create, organize, and manage your AI avatars</p>
          </div>
          <Button className="font-serif bg-gradient-to-r from-primary to-accent">
            <Plus className="w-4 h-4 mr-2" />
            Create New Avatar
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search avatars..."
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
                    <SortAsc className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-serif">
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="videos">Most Videos</SelectItem>
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

        {/* Avatar Grid/List */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {sortedAvatars.map((avatar) => (
            <Card key={avatar.id} className="group hover:shadow-lg transition-all duration-200">
              {viewMode === "grid" ? (
                <>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={avatar.avatarUrl || "/placeholder.svg"}
                      alt={avatar.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge
                        variant={avatar.generationStatus === "completed" ? "default" : "secondary"}
                        className="font-serif text-xs"
                      >
                        {avatar.generationStatus === "processing" ? "Processing..." : "Ready"}
                      </Badge>
                      <Badge variant="outline" className="font-serif text-xs bg-white/90">
                        {avatar.category}
                      </Badge>
                    </div>

                    <div className="absolute top-3 right-3">
                      {avatar.isPublic ? (
                        <Eye className="w-4 h-4 text-white bg-black/50 rounded p-0.5" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-white bg-black/50 rounded p-0.5" />
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-sans font-semibold text-lg mb-1">{avatar.name}</h3>
                    <p className="font-serif text-sm text-muted-foreground mb-3 line-clamp-2">{avatar.description}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-serif">
                        {avatar.videoCount} video{avatar.videoCount !== 1 ? "s" : ""}
                      </span>
                      <span className="font-serif">{new Date(avatar.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4 flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={avatar.avatarUrl || "/placeholder.svg"}
                      alt={avatar.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-sans font-semibold text-lg truncate">{avatar.name}</h3>
                      <Badge
                        variant={avatar.generationStatus === "completed" ? "default" : "secondary"}
                        className="font-serif text-xs"
                      >
                        {avatar.generationStatus === "processing" ? "Processing..." : "Ready"}
                      </Badge>
                      {avatar.isPublic ? (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="font-serif text-sm text-muted-foreground mb-2 line-clamp-1">{avatar.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-serif">{avatar.category}</span>
                      <span className="font-serif">
                        {avatar.videoCount} video{avatar.videoCount !== 1 ? "s" : ""}
                      </span>
                      <span className="font-serif">{new Date(avatar.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {sortedAvatars.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-sans text-lg font-semibold mb-2">No avatars found</h3>
              <p className="font-serif text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setFilterStatus("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
