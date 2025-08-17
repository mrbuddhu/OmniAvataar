import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Manrope } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "OmniAvatar - AI Avatars for Everyone and Everything",
  description:
    "Create stunning AI avatars from photos or descriptions. Generate professional videos with your custom avatars. Transform your content with AI-powered avatar technology.",
  generator: "v0.app",
  keywords: ["AI avatars", "video generation", "artificial intelligence", "content creation", "digital avatars"],
  authors: [{ name: "OmniAvatar Team" }],
  creator: "OmniAvatar",
  publisher: "OmniAvatar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://omniavatar.app"),
  openGraph: {
    title: "OmniAvatar - AI Avatars for Everyone and Everything",
    description:
      "Create stunning AI avatars from photos or descriptions. Generate professional videos with your custom avatars.",
    url: "https://omniavatar.app",
    siteName: "OmniAvatar",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OmniAvatar - AI Avatar Generation Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmniAvatar - AI Avatars for Everyone and Everything",
    description:
      "Create stunning AI avatars from photos or descriptions. Generate professional videos with your custom avatars.",
    images: ["/og-image.png"],
    creator: "@omniavatar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-geist: ${GeistSans.variable};
  --font-manrope: ${manrope.variable};
}
        `}</style>
      </head>
      <body className={`${GeistSans.variable} ${manrope.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
