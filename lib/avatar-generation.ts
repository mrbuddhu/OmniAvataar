// Avatar generation utilities and API integration
export interface AvatarGenerationRequest {
  method: "photo" | "text"
  sourceData: string // Base64 image or text description
  name: string
  description?: string
  style: string
  gender: string
  ageRange: string
  isPublic: boolean
}

export interface AvatarGenerationResponse {
  id: string
  status: "processing" | "completed" | "failed"
  avatarUrl?: string
  thumbnailUrl?: string
  progress: number
  message: string
}

// Mock avatar generation function (to be replaced with real AI service)
export async function generateAvatar(request: AvatarGenerationRequest): Promise<AvatarGenerationResponse> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response
  return {
    id: `avatar_${Date.now()}`,
    status: "processing",
    progress: 0,
    message: "Avatar generation started",
  }
}

// Mock function to check generation status
export async function checkGenerationStatus(avatarId: string): Promise<AvatarGenerationResponse> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock progressive status updates
  const progress = Math.min(100, Math.floor(Math.random() * 100))

  return {
    id: avatarId,
    status: progress === 100 ? "completed" : "processing",
    progress,
    message: progress === 100 ? "Avatar generation completed!" : `Processing... ${progress}%`,
    avatarUrl: progress === 100 ? "/generated-avatar.png" : undefined,
    thumbnailUrl: progress === 100 ? "/stylized-avatar-thumbnail.png" : undefined,
  }
}

// Utility function to validate image files
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith("image/")) {
    return { valid: false, error: "Please upload a valid image file" }
  }

  // Check file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, error: "File size must be less than 10MB" }
  }

  // Check image dimensions (optional)
  return { valid: true }
}

// Utility function to estimate generation time
export function estimateGenerationTime(method: "photo" | "text", style: string): number {
  const baseTime = method === "photo" ? 60 : 90 // seconds
  const styleMultiplier = style === "realistic" ? 1.5 : 1.0
  return Math.round(baseTime * styleMultiplier)
}
