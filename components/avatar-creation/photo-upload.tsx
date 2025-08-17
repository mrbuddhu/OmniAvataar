"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, X, Check, AlertCircle } from "lucide-react"

interface PhotoUploadProps {
  onImageUpload: (imageData: string) => void
  uploadedImage: string | null
  onRemoveImage: () => void
}

export function PhotoUpload({ onImageUpload, uploadedImage, onRemoveImage }: PhotoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      setUploadError(null)

      const files = Array.from(e.dataTransfer.files)
      const imageFile = files.find((file) => file.type.startsWith("image/"))

      if (imageFile) {
        processFile(imageFile)
      } else {
        setUploadError("Please upload a valid image file")
      }
    },
    [onImageUpload],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10MB")
      return
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload a valid image file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      onImageUpload(result)
      setUploadError(null)
    }
    reader.onerror = () => {
      setUploadError("Failed to read the image file")
    }
    reader.readAsDataURL(file)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragOver
              ? "border-primary bg-primary/5"
              : uploadedImage
                ? "border-green-500 bg-green-50"
                : "border-muted-foreground/25 hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadedImage ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded avatar source"
                  className="w-32 h-32 object-cover rounded-lg mx-auto shadow-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                  onClick={onRemoveImage}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="font-serif text-sm text-green-700">Photo uploaded successfully</span>
              </div>
              <div className="space-y-2">
                <Badge variant="outline" className="font-serif">
                  Ready for avatar generation
                </Badge>
                <p className="font-serif text-xs text-muted-foreground">
                  Make sure the face is clearly visible and well-lit for best results
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-lg mb-2">Upload Your Photo</h3>
                <p className="font-serif text-sm text-muted-foreground mb-4">
                  Drag and drop an image here, or click to select
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload-input"
                />
                <label htmlFor="photo-upload-input">
                  <Button asChild className="font-serif">
                    <span>
                      <Camera className="w-4 h-4 mr-2" />
                      Select Photo
                    </span>
                  </Button>
                </label>
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-serif">Supported formats: JPG, PNG, WebP</p>
                <p className="font-serif">Maximum file size: 10MB</p>
              </div>
            </div>
          )}
        </div>

        {uploadError && (
          <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <span className="font-serif text-sm text-destructive">{uploadError}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
