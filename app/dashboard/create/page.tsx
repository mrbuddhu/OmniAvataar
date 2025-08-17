"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Upload, Sparkles, Camera, Type, Palette, User, Zap, ArrowRight, Check, Loader2, RefreshCw } from "lucide-react"

const avatarStyles = [
  {
    id: "realistic",
    name: "Realistic",
    description: "Photorealistic human appearance",
    preview: "/business-avatar-presenting.png",
  },
  {
    id: "stylized",
    name: "Stylized",
    description: "Artistic and creative interpretation",
    preview: "/artistic-avatar.png",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Business-ready appearance",
    preview: "/marketing-avatar-product.png",
  },
  {
    id: "friendly",
    name: "Friendly",
    description: "Warm and approachable look",
    preview: "/friendly-teacher-avatar.png",
  },
  { id: "energetic", name: "Energetic", description: "Dynamic and vibrant style", preview: "/gaming-avatar-neon.png" },
]

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "auto", label: "Auto-detect" },
]

const ageRanges = [
  { value: "18-25", label: "18-25 years" },
  { value: "26-35", label: "26-35 years" },
  { value: "36-45", label: "36-45 years" },
  { value: "46-55", label: "46-55 years" },
  { value: "56+", label: "56+ years" },
  { value: "auto", label: "Auto-detect" },
]

export default function CreateAvatarPage() {
  const [creationMethod, setCreationMethod] = useState<"photo" | "text">("photo")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [textDescription, setTextDescription] = useState("")
  const [avatarName, setAvatarName] = useState("")
  const [avatarDescription, setAvatarDescription] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("realistic")
  const [selectedGender, setSelectedGender] = useState("auto")
  const [selectedAgeRange, setSelectedAgeRange] = useState("auto")
  const [isPublic, setIsPublic] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStep, setGenerationStep] = useState("")

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
    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationStep("Initializing...")

    // Simulate avatar generation process
    const steps = [
      { progress: 20, step: "Analyzing input..." },
      { progress: 40, step: "Processing facial features..." },
      { progress: 60, step: "Applying style transformations..." },
      { progress: 80, step: "Generating avatar..." },
      { progress: 100, step: "Finalizing avatar..." },
    ]

    for (const { progress, step } of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setGenerationProgress(progress)
      setGenerationStep(step)
    }

    // Simulate completion
    setTimeout(() => {
      setIsGenerating(false)
      setGenerationStep("Avatar created successfully!")
    }, 1000)
  }

  const canGenerate = () => {
    if (creationMethod === "photo") {
      return uploadedImage && avatarName.trim()
    }
    return textDescription.trim() && avatarName.trim()
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-sans text-3xl font-bold mb-2">Create Your AI Avatar</h1>
          <p className="font-serif text-muted-foreground">
            Transform a photo or description into a stunning AI avatar in minutes
          </p>
        </div>

        {/* Creation Method Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Choose Creation Method
            </CardTitle>
            <CardDescription className="font-serif">Select how you'd like to create your avatar</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={creationMethod} onValueChange={(value) => setCreationMethod(value as "photo" | "text")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="photo" className="font-serif flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  From Photo
                </TabsTrigger>
                <TabsTrigger value="text" className="font-serif flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  From Description
                </TabsTrigger>
              </TabsList>

              <TabsContent value="photo" className="mt-6">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded"
                          className="w-32 h-32 object-cover rounded-lg mx-auto"
                        />
                        <div className="flex items-center justify-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="font-serif text-sm text-muted-foreground">Photo uploaded successfully</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUploadedImage(null)}
                          className="font-serif"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-sans font-semibold text-lg mb-2">Upload Your Photo</h3>
                          <p className="font-serif text-sm text-muted-foreground mb-4">
                            Choose a clear photo with good lighting for best results
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label htmlFor="photo-upload">
                            <Button asChild className="font-serif">
                              <span>
                                <Camera className="w-4 h-4 mr-2" />
                                Select Photo
                              </span>
                            </Button>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="text" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description" className="font-serif">
                      Describe Your Avatar
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your ideal avatar in detail... (e.g., 'A professional woman in her 30s with brown hair, wearing a blue business suit, friendly smile, standing in an office setting')"
                      value={textDescription}
                      onChange={(e) => setTextDescription(e.target.value)}
                      className="mt-2 min-h-32 font-serif"
                    />
                    <p className="font-serif text-xs text-muted-foreground mt-2">
                      Be specific about appearance, clothing, setting, and mood for best results
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Avatar Configuration */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-sans flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Avatar Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="avatar-name" className="font-serif">
                  Avatar Name *
                </Label>
                <Input
                  id="avatar-name"
                  placeholder="e.g., Professional John"
                  value={avatarName}
                  onChange={(e) => setAvatarName(e.target.value)}
                  className="mt-2 font-serif"
                />
              </div>

              <div>
                <Label htmlFor="avatar-desc" className="font-serif">
                  Description (Optional)
                </Label>
                <Textarea
                  id="avatar-desc"
                  placeholder="Brief description of this avatar's purpose..."
                  value={avatarDescription}
                  onChange={(e) => setAvatarDescription(e.target.value)}
                  className="mt-2 font-serif"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-serif font-medium">Make Public</Label>
                  <p className="font-serif text-xs text-muted-foreground">Allow others to discover this avatar</p>
                </div>
                <Switch checked={isPublic} onCheckedChange={setIsPublic} />
              </div>
            </CardContent>
          </Card>

          {/* Style & Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="font-sans flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Style & Customization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="font-serif">Gender</Label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger className="mt-2 font-serif">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-serif">
                    {genderOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-serif">Age Range</Label>
                <Select value={selectedAgeRange} onValueChange={setSelectedAgeRange}>
                  <SelectTrigger className="mt-2 font-serif">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-serif">
                    {ageRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Style Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans">Choose Avatar Style</CardTitle>
            <CardDescription className="font-serif">Select the visual style that best fits your needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {avatarStyles.map((style) => (
                <div
                  key={style.id}
                  className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                    selectedStyle === style.id
                      ? "border-primary shadow-lg scale-105"
                      : "border-muted hover:border-muted-foreground"
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={style.preview || "/placeholder.svg"}
                      alt={style.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-sans font-semibold text-sm mb-1">{style.name}</h3>
                    <p className="font-serif text-xs text-muted-foreground">{style.description}</p>
                  </div>
                  {selectedStyle === style.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Generation Section */}
        <Card>
          <CardContent className="p-6">
            {isGenerating ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-lg mb-2">Creating Your Avatar</h3>
                  <p className="font-serif text-muted-foreground mb-4">{generationStep}</p>
                  <Progress value={generationProgress} className="max-w-md mx-auto" />
                  <p className="font-serif text-sm text-muted-foreground mt-2">{generationProgress}% complete</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-sans font-semibold text-lg mb-1">Ready to Generate</h3>
                  <p className="font-serif text-muted-foreground">
                    Your avatar will be created using{" "}
                    {creationMethod === "photo" ? "photo analysis" : "text description"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="font-serif">
                    1 credit required
                  </Badge>
                  <Button
                    onClick={handleGenerate}
                    disabled={!canGenerate()}
                    className="font-serif bg-gradient-to-r from-primary to-accent"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Avatar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
