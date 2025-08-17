// Video generation utilities and API integration
export interface VideoGenerationRequest {
  avatarId: string
  title: string
  description?: string
  script: string
  voiceId: string
  voiceSpeed: number
  voicePitch: number
  quality: "sd" | "hd" | "fhd" | "4k"
  isPublic: boolean
}

export interface VideoGenerationResponse {
  id: string
  status: "queued" | "processing" | "completed" | "failed"
  videoUrl?: string
  thumbnailUrl?: string
  progress: number
  message: string
  estimatedTimeRemaining?: number
}

export interface VoiceOption {
  id: string
  name: string
  gender: "male" | "female"
  accent: string
  previewUrl: string
  language: string
}

export interface QualityOption {
  id: string
  name: string
  description: string
  resolution: string
  credits: number
  maxDuration: number // in seconds
}

// Mock video generation function (to be replaced with real AI service)
export async function generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
  console.log("[v0] Starting video generation with request:", request)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response
  return {
    id: `video_${Date.now()}`,
    status: "queued",
    progress: 0,
    message: "Video generation queued successfully",
    estimatedTimeRemaining: 300, // 5 minutes
  }
}

// Mock function to check generation status
export async function checkVideoGenerationStatus(videoId: string): Promise<VideoGenerationResponse> {
  console.log("[v0] Checking video generation status for:", videoId)

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock progressive status updates
  const progress = Math.min(100, Math.floor(Math.random() * 100))
  const isComplete = progress === 100

  return {
    id: videoId,
    status: isComplete ? "completed" : "processing",
    progress,
    message: isComplete ? "Video generation completed!" : `Processing... ${progress}%`,
    videoUrl: isComplete ? "/generated-video.mp4" : undefined,
    thumbnailUrl: isComplete ? "/generated-video-thumbnail.jpg" : undefined,
    estimatedTimeRemaining: isComplete ? 0 : Math.max(30, 300 - progress * 3),
  }
}

// Available voice options
export const voiceOptions: VoiceOption[] = [
  {
    id: "voice_professional_male",
    name: "Professional Male",
    gender: "male",
    accent: "american",
    previewUrl: "/voice-previews/professional-male.mp3",
    language: "en-US",
  },
  {
    id: "voice_friendly_female",
    name: "Friendly Female",
    gender: "female",
    accent: "american",
    previewUrl: "/voice-previews/friendly-female.mp3",
    language: "en-US",
  },
  {
    id: "voice_british_male",
    name: "British Male",
    gender: "male",
    accent: "british",
    previewUrl: "/voice-previews/british-male.mp3",
    language: "en-GB",
  },
  {
    id: "voice_energetic_female",
    name: "Energetic Female",
    gender: "female",
    accent: "american",
    previewUrl: "/voice-previews/energetic-female.mp3",
    language: "en-US",
  },
]

// Quality options with pricing
export const qualityOptions: QualityOption[] = [
  {
    id: "sd",
    name: "SD (480p)",
    description: "Standard quality, smaller file size",
    resolution: "854x480",
    credits: 1,
    maxDuration: 600, // 10 minutes
  },
  {
    id: "hd",
    name: "HD (720p)",
    description: "High quality, balanced size",
    resolution: "1280x720",
    credits: 2,
    maxDuration: 600,
  },
  {
    id: "fhd",
    name: "Full HD (1080p)",
    description: "Premium quality, larger file",
    resolution: "1920x1080",
    credits: 3,
    maxDuration: 300, // 5 minutes
  },
  {
    id: "4k",
    name: "4K (2160p)",
    description: "Ultra quality, largest file",
    resolution: "3840x2160",
    credits: 5,
    maxDuration: 180, // 3 minutes
  },
]

// Utility functions
export function estimateVideoDuration(script: string, wordsPerMinute = 150): number {
  const wordCount = script.split(" ").filter((word) => word.length > 0).length
  return Math.ceil((wordCount / wordsPerMinute) * 60) // Return seconds
}

export function calculateVideoCredits(quality: string, duration: number): number {
  const qualityOption = qualityOptions.find((q) => q.id === quality)
  if (!qualityOption) return 1

  // Base credits for quality
  let credits = qualityOption.credits

  // Additional credits for longer videos
  if (duration > 60) {
    const additionalMinutes = Math.ceil((duration - 60) / 60)
    credits += additionalMinutes * qualityOption.credits
  }

  return credits
}

export function formatVideoDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function validateVideoScript(script: string): { valid: boolean; error?: string } {
  if (!script.trim()) {
    return { valid: false, error: "Script cannot be empty" }
  }

  if (script.length < 10) {
    return { valid: false, error: "Script must be at least 10 characters long" }
  }

  if (script.length > 10000) {
    return { valid: false, error: "Script cannot exceed 10,000 characters" }
  }

  const wordCount = script.split(" ").filter((word) => word.length > 0).length
  if (wordCount < 5) {
    return { valid: false, error: "Script must contain at least 5 words" }
  }

  return { valid: true }
}

// Export utility for getting estimated generation time
export function getEstimatedGenerationTime(quality: string, duration: number): number {
  const baseTime = 120 // 2 minutes base time
  const qualityMultiplier =
    {
      sd: 1,
      hd: 1.5,
      fhd: 2,
      "4k": 3,
    }[quality] || 1

  const durationMultiplier = Math.max(1, duration / 60) // Scale with video length

  return Math.round(baseTime * qualityMultiplier * durationMultiplier)
}
