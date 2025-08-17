"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Video, Play, Mic, Settings, Sparkles, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser, type User } from "@/lib/auth"

export default function CreateVideoPage() {
  const [user, setUser] = useState<User | null>(null)
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
  const [script, setScript] = useState("")
  const [videoQuality, setVideoQuality] = useState("HD")
  const [voiceSpeed, setVoiceSpeed] = useState([1])
  const [voicePitch, setVoicePitch] = useState([1])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/auth/signin")
        return
      }
      setUser(currentUser)
    }
    loadUser()
  }, [router])

  const mockAvatars = [
    {
      id: "1",
      name: "Professional Sarah",
      style: "Corporate",
      avatarUrl: "/business-avatar-presenting.png",
      status: "completed",
    },
    {
      id: "2",
      name: "Creative Alex",
      style: "Artistic",
      avatarUrl: "/artistic-avatar.png",
      status: "completed",
    },
    {
      id: "3",
      name: "Teacher Mike",
      style: "Casual",
      avatarUrl: "/friendly-teacher-avatar.png",
      status: "completed",
    },
  ]

  const handleGenerate = async () => {
    if (!selectedAvatar) {
      toast({
        title: "Please select an avatar",
        description: "You need to choose an avatar to create a video.",
        variant: "destructive",
      })
      return
    }

    if (!videoTitle.trim()) {
      toast({
        title: "Please add a title",
        description: "Your video needs a title.",
        variant: "destructive",
      })
      return
    }

    if (!script.trim()) {
      toast({
        title: "Please add a script",
        description: "Your video needs a script for the avatar to speak.",
        variant: "destructive",
      })
      return
    }

    if (user && user.creditsRemaining <= 0) {
      toast({
        title: "Insufficient credits",
        description: "You need credits to generate videos. Please upgrade your plan.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate video generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsGenerating(false)
          toast({
            title: "Video generated successfully!",
            description: "Your video is ready to view and download.",
          })
          router.push("/dashboard")
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const estimatedDuration = Math.ceil(script.split(" ").length / 150) // ~150 words per minute

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
            <Link href="/dashboard" className="flex items-center space-x-3">
              <ArrowLeft className="w-5 h-5 text-slate-600" />
              <span className="font-serif text-slate-600">Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Video className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="font-sans font-bold text-xl bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Create Video
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-sans text-3xl font-bold text-slate-900 mb-2">Generate AI Video</h1>
          <p className="font-serif text-slate-600">Create professional videos with your AI avatars</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Avatar Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Select Avatar</CardTitle>
                <CardDescription className="font-serif">Choose which avatar will appear in your video</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {mockAvatars.map((avatar) => (
                    <div
                      key={avatar.id}
                      className={`relative cursor-pointer rounded-lg border-2 transition-all ${
                        selectedAvatar === avatar.id
                          ? "border-primary shadow-lg scale-105"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                      onClick={() => setSelectedAvatar(avatar.id)}
                    >
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <img
                          src={avatar.avatarUrl || "/placeholder.svg"}
                          alt={avatar.name}
                          className="w-full h-full object-cover"
                        />
                        {selectedAvatar === avatar.id && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <Play className="w-4 h-4 text-white fill-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-sans font-semibold text-sm text-slate-900">{avatar.name}</h3>
                        <p className="font-serif text-xs text-slate-600">{avatar.style}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Video Details</CardTitle>
                <CardDescription className="font-serif">Configure your video content and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-serif">
                    Video Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter your video title..."
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="font-serif"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="script" className="font-serif">
                    Script
                  </Label>
                  <Textarea
                    id="script"
                    placeholder="Enter the script for your avatar to speak..."
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    className="min-h-32 font-serif"
                  />
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span className="font-serif">
                      {script.split(" ").filter((word) => word.length > 0).length} words
                    </span>
                    <span className="font-serif flex items-center">
                      <Clock className="w-3 h-3 mr-1" />~{estimatedDuration} min
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-serif">Video Quality</Label>
                  <Select value={videoQuality} onValueChange={setVideoQuality}>
                    <SelectTrigger className="font-serif">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SD" className="font-serif">
                        SD (480p) - Faster generation
                      </SelectItem>
                      <SelectItem value="HD" className="font-serif">
                        HD (720p) - Recommended
                      </SelectItem>
                      <SelectItem value="4K" className="font-serif">
                        4K (2160p) - Premium quality
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Voice Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center space-x-2">
                  <Mic className="w-5 h-5" />
                  <span>Voice Settings</span>
                </CardTitle>
                <CardDescription className="font-serif">Customize how your avatar speaks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="font-serif">Speaking Speed</Label>
                  <Slider
                    value={voiceSpeed}
                    onValueChange={setVoiceSpeed}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 font-serif">
                    <span>Slow (0.5x)</span>
                    <span>Normal ({voiceSpeed[0]}x)</span>
                    <span>Fast (2x)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="font-serif">Voice Pitch</Label>
                  <Slider
                    value={voicePitch}
                    onValueChange={setVoicePitch}
                    max={2}
                    min={0.5}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 font-serif">
                    <span>Low (0.5x)</span>
                    <span>Normal ({voicePitch[0]}x)</span>
                    <span>High (2x)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Generation Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Preview</CardTitle>
                <CardDescription className="font-serif">See how your video will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {selectedAvatar ? (
                    <img
                      src={mockAvatars.find((a) => a.id === selectedAvatar)?.avatarUrl || "/placeholder.svg"}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Video className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="font-serif text-sm text-slate-500">Select an avatar to preview</p>
                    </div>
                  )}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p className="font-serif text-sm">Generating... {Math.round(generationProgress)}%</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Generation Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Generation Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm text-slate-600">Estimated Duration</span>
                  <Badge variant="outline" className="font-serif">
                    {estimatedDuration} min
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm text-slate-600">Quality</span>
                  <Badge variant="outline" className="font-serif">
                    {videoQuality}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm text-slate-600">Credits Required</span>
                  <Badge variant="outline" className="font-serif">
                    1 credit
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm text-slate-600">Your Credits</span>
                  <Badge variant={user.creditsRemaining > 0 ? "default" : "destructive"} className="font-serif">
                    {user.creditsRemaining} remaining
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || user.creditsRemaining <= 0}
              size="lg"
              className="w-full font-serif text-lg py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Video...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Video
                </>
              )}
            </Button>

            {user.creditsRemaining <= 0 && (
              <p className="font-serif text-sm text-center text-slate-500">
                You need credits to generate videos.{" "}
                <Link href="/dashboard" className="text-primary hover:underline">
                  Upgrade your plan
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
