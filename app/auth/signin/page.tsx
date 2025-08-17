"use client"

import { SignInForm } from "@/components/auth/sign-in-form"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
          </div>
          <span className="font-sans font-bold text-2xl bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            OmniAvatar
          </span>
        </Link>

        <Link href="/">
          <Button variant="ghost" className="font-serif">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <SignInForm />

          <div className="mt-6 text-center">
            <p className="font-serif text-slate-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:text-accent transition-colors font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
