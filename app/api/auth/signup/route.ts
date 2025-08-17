import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    // Basic validation
    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Mock user creation - in production, save to database
    const newUser = {
      id: Date.now().toString(),
      email,
      fullName,
      subscriptionTier: "free",
      subscriptionStatus: "active",
      creditsRemaining: 10,
      createdAt: new Date().toISOString(),
    }

    // Generate token
    const token = btoa(JSON.stringify(newUser))

    const response = NextResponse.json({
      success: true,
      user: newUser,
      message: "Account created successfully",
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Sign up error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
