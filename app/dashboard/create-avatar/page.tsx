"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Type, Sparkles, ArrowLeft, ImageIcon, Wand2, Palette } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function CreateAvatarPage() {
  const [activeTab, setActiveTab] = useState("photo")
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [textDescription, setTextDescription] = useState("")
  const [avatarName, setAvatarName] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [selectedAge, setSelectedAge] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (activeTab === "photo" && !uploadedImage) {
      toast({
        title: "Please upload an image",
        description: "You need to upload a photo to create an avatar.",
        variant: "destructive",
      })
      return
    }

    if (activeTab === "text" && !textDescription.trim()) {
      toast({
        title: "Please provide a description",
        description: "You need to describe your avatar to generate it.",
        variant: "destructive",
      })
      return
    }

    if (!avatarName.trim()) {
      toast({
        title: "Please name your avatar",
        description: "Give your avatar a name to continue.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // Simulate avatar generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "Avatar created successfully!",
        description: "Your new avatar is ready to use.",
      })
      router.push("/dashboard")
    }, 3000)
  }

  const avatarStyles = [
    { value: "realistic", label: "Realistic", description: "Photorealistic human appearance" },
    { value: "artistic", label: "Artistic", description: "Stylized and creative look" },
    { value: "corporate", label: "Corporate", description: "Professional business style" },
    { value: "casual", label: "Casual", description: "Relaxed and friendly appearance" },
    { value: "gaming", label: "Gaming", description: "Dynamic gaming character style" },
    { value: "anime", label: "Anime", description: "Japanese animation style" },
  ]

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
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="font-sans font-bold text-xl bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Create Avatar
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-sans text-3xl font-bold text-slate-900 mb-2">Create Your AI Avatar</h1>
          <p className="font-serif text-slate-600">Upload a photo or describe your ideal avatar to get started</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="photo" className="font-serif flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Photo Upload</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="font-serif flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Text Description</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="photo" className="space-y-6">
                <div className="space-y-4">
                  <Label className="font-serif text-base font-medium">Upload Your Photo</Label>
                  <div
                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded"
                          className="max-w-xs max-h-64 mx-auto rounded-lg shadow-lg"
                        />
                        <p className="font-serif text-sm text-slate-600">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                          <ImageIcon className="w-8 h-8 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-serif text-slate-900 font-medium">Click to upload an image</p>
                          <p className="font-serif text-sm text-slate-500">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="description" className="font-serif text-base font-medium">
                    Describe Your Avatar
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your ideal avatar in detail... (e.g., 'A professional woman in her 30s with brown hair, wearing a business suit, friendly smile, standing in an office environment')"
                    value={textDescription}
                    onChange={(e) => setTextDescription(e.target.value)}
                    className="min-h-32 font-serif"
                  />
                  <p className="font-serif text-sm text-slate-500">
                    Be as detailed as possible for better results. Include appearance, clothing, setting, and mood.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Avatar Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-sans flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Avatar Configuration</span>
            </CardTitle>
            <CardDescription className="font-serif">Customize your avatar's appearance and style</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="avatarName" className="font-serif">
                Avatar Name
              </Label>
              <Input
                id="avatarName"
                placeholder="Give your avatar a name..."
                value={avatarName}
                onChange={(e) => setAvatarName(e.target.value)}
                className="font-serif"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="font-serif">Style</Label>
                <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                  <SelectTrigger className="font-serif">
                    <SelectValue placeholder="Choose style" />
                  </SelectTrigger>
                  <SelectContent>
                    {avatarStyles.map((style) => (
                      <SelectItem key={style.value} value={style.value} className="font-serif">
                        <div>
                          <div className="font-medium">{style.label}</div>
                          <div className="text-sm text-slate-500">{style.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-serif">Gender</Label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger className="font-serif">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male" className="font-serif">
                      Male
                    </SelectItem>
                    <SelectItem value="female" className="font-serif">
                      Female
                    </SelectItem>
                    <SelectItem value="non-binary" className="font-serif">
                      Non-binary
                    </SelectItem>
                    <SelectItem value="auto" className="font-serif">
                      Auto-detect
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="font-serif">Age Range</Label>
                <Select value={selectedAge} onValueChange={setSelectedAge}>
                  <SelectTrigger className="font-serif">
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="young" className="font-serif">
                      Young (18-25)
                    </SelectItem>
                    <SelectItem value="adult" className="font-serif">
                      Adult (26-40)
                    </SelectItem>
                    <SelectItem value="middle" className="font-serif">
                      Middle-aged (41-60)
                    </SelectItem>
                    <SelectItem value="senior" className="font-serif">
                      Senior (60+)
                    </SelectItem>
                    <SelectItem value="auto" className="font-serif">
                      Auto-detect
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center">
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            size="lg"
            className="font-serif text-lg px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating Avatar...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Avatar
              </>
            )}
          </Button>
          {!isGenerating && (
            <p className="font-serif text-sm text-slate-500 mt-2">This will use 1 credit from your account</p>
          )}
        </div>
      </main>
    </div>
  )
}
