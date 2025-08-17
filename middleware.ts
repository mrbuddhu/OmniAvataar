import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if user is accessing protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // In a real app, you'd check for a valid session token
    // For now, we'll let the dashboard page handle the redirect
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
