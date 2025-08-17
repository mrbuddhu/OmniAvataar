"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Video, Play, Zap, ArrowRight, Loader2, CheckCircle, User, Mic, Monitor } from "lucide-react"

// Mock avatar data
const mockAvatars = [
  {
    id: "1",
    name: "Professional John",
    thumbnailUrl: "/business-avatar-presenting.png",
    style: "realistic",
  },
  {
    id: "2",
    name: "Creative Artist",
    thumbnailUrl: "/artistic-avatar.png",
    style: "stylized",
  },
  {
    id: "3",
    name: "Teacher Mode",
    thumbnailUrl: "/friendly-teacher-avatar.png",
    style: "friendly",
  },
  {
    id: "4",
    name: "Gaming Streamer",
    thumbnailUrl: "/gaming-avatar-neon.png",
    style: "energetic",
  },
]

const voiceOptions = [
  { id: "voice_1", name: "Professional Male", gender: "male", accent: "american", preview: "/voice-preview-1.mp3" },
  { id: "voice_2", name: "Friendly Female", gender: "female", accent: "american", preview: "/voice-preview-2.mp3" },
  { id: "voice_3", name: "British Male", gender: "male", accent: "british", preview: "/voice-preview-3.mp3" },
  { id: "voice_4", name: "Energetic Female", gender: "female", accent: "american", preview: "/voice-preview-4.mp3" },
]

const qualityOptions = [
  { id: "sd", name: "SD (480p)", description: "Standard quality, smaller file size", credits: 1 },
  { id: "hd", name: "HD (720p)", description: "High quality, balanced size", credits: 2 },
  { id: "fhd", name: "Full HD (1080p)", description: "Premium quality, larger file", credits: 3 },
  { id: "4k", name: "4K (2160p)", description: "Ultra quality, largest file", credits: 5 },
]

export default function CreateVideoPage() {
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [script, setScript] = useState("")
  const [selectedVoice, setSelectedVoice] = useState("")
  const [voiceSpeed, setVoiceSpeed] = useState([1.0])
  const [voicePitch, setVoicePitch] = useState([1.0])
  const [selectedQuality, setSelectedQuality] = useState("hd")
  const [isPublic, setIsPublic] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState("")

  const selectedQualityOption = qualityOptions.find((q) => q.id === selectedQuality)
  const estimatedDuration = Math.ceil(script.split(" ").length / 2.5) // Rough estimate: 150 words per minute

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationStep("Initializing video generation...")

    // Simulate video generation process
    const steps = [
      { progress: 15, step: "Processing script and voice settings..." },
      { progress: 30, step: "Preparing avatar animations..." },
      { progress: 50, step: "Generating lip-sync and expressions..." },
      { progress: 70, step: "Rendering video frames..." },
      { progress: 85, step: "Adding audio and final touches..." },
      { progress: 100, step: "Video generation complete!" },
    ]

    for (const { progress, step } of steps) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setGenerationProgress(progress)
      setGenerationStep(step)
    }

    // Simulate completion
    setTimeout(() => {
      setIsGenerating(false)
      setGenerationStep("Video created successfully!")
    }, 1000)
  }

  const canGenerate = () => {
    return selectedAvatar && videoTitle.trim() && script.trim() && selectedVoice && selectedQuality
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-sans text-3xl font-bold mb-2">Create AI Video</h1>
          <p className="font-serif text-muted-foreground">
            Transform your avatar into a professional video with AI-powered speech and animation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Avatar Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Choose Avatar
                </CardTitle>
                <CardDescription className="font-serif">Select which avatar will appear in your video</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockAvatars.map((avatar) => (
                    <div
                      key={avatar.id}
                      className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                        selectedAvatar === avatar.id
                          ? "border-primary shadow-lg scale-105"
                          : "border-muted hover:border-muted-foreground"
                      }`}
                      onClick={() => setSelectedAvatar(avatar.id)}
                    >
                      <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                        <img
                          src={avatar.thumbnailUrl || "/placeholder.svg"}
                          alt={avatar.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-sans font-semibold text-sm text-center">{avatar.name}</h3>
                      </div>
                      {selectedAvatar === avatar.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  Video Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="video-title" className="font-serif">
                    Video Title *
                  </Label>
                  <Input
                    id="video-title"
                    placeholder="e.g., Product Demo Presentation"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="mt-2 font-serif"
                  />
                </div>

                <div>
                  <Label htmlFor="video-description" className="font-serif">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="video-description"
                    placeholder="Brief description of your video..."
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    className="mt-2 font-serif"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-serif font-medium">Make Public</Label>
                    <p className="font-serif text-xs text-muted-foreground">Allow others to discover this video</p>
                  </div>
                  <Switch checked={isPublic} onCheckedChange={setIsPublic} />
                </div>
              </CardContent>
            </Card>

            {/* Script Input */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Video Script</CardTitle>
                <CardDescription className="font-serif">
                  Write the script that your avatar will speak in the video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="script" className="font-serif">
                    Script Content *
                  </Label>
                  <Textarea
                    id="script"
                    placeholder="Hello! Welcome to our product demonstration. Today I'll be showing you how our amazing features can help transform your business..."
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    className="mt-2 min-h-32 font-serif"
                  />
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span className="font-serif">
                      {script.split(" ").filter((word) => word.length > 0).length} words
                    </span>
                    <span className="font-serif">~{estimatedDuration} seconds estimated</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Voice Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <Mic className="w-5 h-5 text-primary" />
                  Voice Settings
                </CardTitle>
                <CardDescription className="font-serif">Customize how your avatar will sound</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="font-serif">Voice Selection</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {voiceOptions.map((voice) => (
                      <div
                        key={voice.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedVoice === voice.id
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-muted-foreground"
                        }`}
                        onClick={() => setSelectedVoice(voice.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-sans font-semibold text-sm">{voice.name}</h3>
                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                            <Play className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="font-serif text-xs capitalize">
                            {voice.gender}
                          </Badge>
                          <Badge variant="outline" className="font-serif text-xs capitalize">
                            {voice.accent}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="font-serif">Speech Speed</Label>
                    <div className="mt-2 space-y-2">
                      <Slider
                        value={voiceSpeed}
                        onValueChange={setVoiceSpeed}
                        min={0.5}
                        max={2.0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground font-serif">
                        <span>Slow (0.5x)</span>
                        <span>Normal ({voiceSpeed[0]}x)</span>
                        <span>Fast (2.0x)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="font-serif">Voice Pitch</Label>
                    <div className="mt-2 space-y-2">
                      <Slider
                        value={voicePitch}
                        onValueChange={setVoicePitch}
                        min={0.5}
                        max={1.5}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground font-serif">
                        <span>Low (0.5x)</span>
                        <span>Normal ({voicePitch[0]}x)</span>
                        <span>High (1.5x)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quality Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" />
                  Video Quality
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {qualityOptions.map((quality) => (
                  <div
                    key={quality.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedQuality === quality.id
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-muted-foreground"
                    }`}
                    onClick={() => setSelectedQuality(quality.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-sans font-semibold text-sm">{quality.name}</h3>
                      <Badge variant="secondary" className="font-serif text-xs">
                        {quality.credits} credits
                      </Badge>
                    </div>
                    <p className="font-serif text-xs text-muted-foreground">{quality.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Generation Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Generation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-serif text-muted-foreground">Estimated Duration:</span>
                  <span className="font-sans font-medium">{estimatedDuration}s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-serif text-muted-foreground">Video Quality:</span>
                  <span className="font-sans font-medium">{selectedQualityOption?.name || "Not selected"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-serif text-muted-foreground">Credits Required:</span>
                  <span className="font-sans font-medium">{selectedQualityOption?.credits || 0}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="font-serif">Total Cost:</span>
                    <span className="font-sans">{selectedQualityOption?.credits || 0} credits</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Card>
              <CardContent className="p-6">
                {isGenerating ? (
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-lg mb-2">Generating Video</h3>
                      <p className="font-serif text-muted-foreground text-sm mb-4">{generationStep}</p>
                      <Progress value={generationProgress} className="mb-2" />
                      <p className="font-serif text-xs text-muted-foreground">{generationProgress}% complete</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-sans font-semibold text-lg mb-1">Ready to Generate</h3>
                      <p className="font-serif text-muted-foreground text-sm">
                        Your video will be created with the selected settings
                      </p>
                    </div>
                    <Button
                      onClick={handleGenerate}
                      disabled={!canGenerate()}
                      className="w-full font-serif bg-gradient-to-r from-primary to-accent"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Video
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
