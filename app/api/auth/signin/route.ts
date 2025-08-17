import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Mock authentication - in production, verify against database
    const mockUser = {
      id: "1",
      email,
      fullName: email
        .split("@")[0]
        .replace(/[^a-zA-Z]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      subscriptionTier: "pro",
      subscriptionStatus: "active",
      creditsRemaining: 47,
    }

    // In production, generate proper JWT token
    const token = btoa(JSON.stringify(mockUser))

    const response = NextResponse.json({
      success: true,
      user: mockUser,
      message: "Signed in successfully",
    })

    // Set HTTP-only cookie for authentication
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
