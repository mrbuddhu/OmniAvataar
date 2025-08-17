"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { signUp } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = await signUp(email, password, fullName)
      if (user) {
        toast({
          title: "Account created successfully!",
          description: "Welcome to OmniAvatar. You can now start creating avatars.",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Sign up failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="font-sans text-2xl">Create your account</CardTitle>
        <CardDescription className="font-serif">Start creating amazing AI avatars today</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="font-serif">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="font-serif"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="font-serif">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="font-serif"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-serif">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="font-serif"
            />
          </div>
          <Button type="submit" className="w-full font-serif" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
