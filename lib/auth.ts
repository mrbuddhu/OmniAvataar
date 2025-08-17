// Authentication utilities and types
export interface User {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  subscriptionTier: "free" | "creator" | "pro" | "business"
  subscriptionStatus: "active" | "cancelled" | "past_due" | "paused"
  creditsRemaining: number
  createdAt: string
  updatedAt: string
}

export interface Avatar {
  id: string
  userId: string
  name: string
  description?: string
  avatarType: "photo_upload" | "text_description"
  sourceData: any
  avatarUrl: string
  style: string
  gender?: string
  ageRange?: string
  isPublic: boolean
  generationStatus: "processing" | "completed" | "failed"
  createdAt: string
  updatedAt: string
}

export interface Video {
  id: string
  userId: string
  avatarId: string
  title: string
  script: string
  videoUrl?: string
  thumbnailUrl?: string
  durationSeconds?: number
  videoQuality: "SD" | "HD" | "4K"
  voiceSettings: any
  generationStatus: "queued" | "processing" | "completed" | "failed"
  isPublic: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
}

// Mock authentication functions (to be replaced with real auth)
export async function getCurrentUser(): Promise<User | null> {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("omniavatar_user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export async function signIn(email: string, password: string): Promise<User | null> {
  if (email && password.length >= 6) {
    const user: User = {
      id: crypto.randomUUID(),
      email,
      fullName: "Demo User",
      subscriptionTier: "free",
      subscriptionStatus: "active",
      creditsRemaining: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem("omniavatar_user", JSON.stringify(user))
    return user
  }
  return null
}

export async function signUp(email: string, password: string, fullName: string): Promise<User | null> {
  if (email && password.length >= 6 && fullName) {
    const user: User = {
      id: crypto.randomUUID(),
      email,
      fullName,
      subscriptionTier: "free",
      subscriptionStatus: "active",
      creditsRemaining: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    localStorage.setItem("omniavatar_user", JSON.stringify(user))
    return user
  }
  return null
}

export async function signOut(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem("omniavatar_user")
  }
}
