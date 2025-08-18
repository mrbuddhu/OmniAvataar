"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { OmniAvataarLogo } from "@/components/ui/omniavataar-logo"
import { Footer } from "@/components/ui/footer"
import {
  Play,
  Users,
  Video,
  Zap,
  Eye,
  Heart,
  MessageSquare,
  Star,
  Plus,
  Globe,
  Mic,
  Languages,
  Smartphone,
  Shield,
  Clock,
  ArrowRight,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

const videoCards = [
  {
    id: 1,
    title: "Executive Pitch",
    description: "Professional AI avatar for business presentations",
    thumbnailUrl: "/business-avatar-presenting.png",
    duration: "2:34",
    views: "12.5K",
    likes: "1.2K",
    category: "Business",
    isNew: false,
  },
  {
    id: 2,
    title: "Creative Showcase",
    description: "Artistic AI avatar for creative content",
    thumbnailUrl: "/artistic-avatar.png",
    duration: "1:45",
    views: "8.3K",
    likes: "892",
    category: "Creative",
    isNew: true,
  },
  {
    id: 3,
    title: "Educational Content",
    description: "Friendly AI avatar for teaching and tutorials",
    thumbnailUrl: "/friendly-teacher-avatar.png",
    duration: "3:12",
    views: "15.7K",
    likes: "1.8K",
    category: "Education",
    isNew: false,
  },
  {
    id: 4,
    title: "Gaming Stream",
    description: "Dynamic AI avatar for gaming content",
    thumbnailUrl: "/gaming-avatar-neon.png",
    duration: "2:58",
    views: "22.1K",
    likes: "2.4K",
    category: "Gaming",
    isNew: true,
  },
  {
    id: 5,
    title: "Product Demo",
    description: "Professional AI avatar for product showcases",
    thumbnailUrl: "/marketing-avatar-product.png",
    duration: "1:33",
    views: "9.8K",
    likes: "1.1K",
    category: "Marketing",
    isNew: false,
  },
  {
    id: 6,
    title: "Tech Review",
    description: "Expert AI avatar for technology reviews",
    thumbnailUrl: "/tech-reviewer-avatar.png",
    duration: "4:15",
    views: "18.9K",
    likes: "2.1K",
    category: "Technology",
    isNew: true,
  },
  {
    id: 7,
    title: "Fitness Coach",
    description: "Motivational AI avatar for fitness content",
    thumbnailUrl: "/fitness-coach-avatar.png",
    duration: "2:22",
    views: "14.3K",
    likes: "1.6K",
    category: "Fitness",
    isNew: false,
  },
]

const benefits = [
  {
    icon: Clock,
    title: "60-Second Generation",
    description:
      "Create professional videos 3x faster than any competitor. What takes others 3 minutes, we do in 60 seconds.",
  },
  {
    icon: Languages,
    title: "75+ Languages",
    description: "Native-quality voice synthesis in 75+ languages with cultural nuances and regional accents.",
  },
  {
    icon: Mic,
    title: "Voice Cloning",
    description: "Clone any voice with just 30 seconds of audio. Maintain consistency across all your content.",
  },
  {
    icon: Globe,
    title: "Real-time Translation",
    description: "Translate existing videos while maintaining lip-sync accuracy and voice characteristics.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC2 compliant with end-to-end encryption. Your data never leaves our secure infrastructure.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Full-featured iOS and Android apps. Create, edit, and publish from anywhere.",
  },
]

const steps = [
  {
    number: "01",
    title: "Choose Your Avatar",
    description: "Select from 500+ professional avatars or create your own custom avatar in minutes.",
    icon: Users,
  },
  {
    number: "02",
    title: "Write Your Script",
    description: "Type your message or upload existing content. Our AI optimizes for natural speech patterns.",
    icon: MessageSquare,
  },
  {
    number: "03",
    title: "Generate & Share",
    description: "Get your professional video in 60 seconds. Export in 4K or share directly to social platforms.",
    icon: Zap,
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow",
    content: "Cut our video production time by 90%. What used to take days now takes minutes.",
    avatar: "/professional-woman-diverse.png",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Content Creator",
    company: "Independent",
    content: "The voice cloning is incredible. My audience can't tell the difference from my real voice.",
    avatar: "/content-creator-man.png",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Training Manager",
    company: "Global Corp",
    content: "Localized our training videos to 12 languages in one afternoon. Game-changing.",
    avatar: "/confident-business-woman.png",
    rating: 5,
  },
]

const faqs = [
  {
    question: "How does the 60-second generation work?",
    answer:
      "Our proprietary neural architecture processes video generation 3x faster than traditional methods. We use optimized GPU clusters and advanced compression algorithms to deliver professional quality in record time.",
  },
  {
    question: "Can I really clone any voice?",
    answer:
      "Yes, with just 30 seconds of clear audio, our voice cloning technology can replicate speech patterns, tone, and accent. The cloned voice supports 75+ languages and maintains consistency across all content.",
  },
  {
    question: "What makes you better than HeyGen?",
    answer:
      "We're 3x faster (60 seconds vs 3+ minutes), support more languages (75+ vs 40+), include voice cloning in all plans, and offer real-time video translation. Plus, we have mobile apps and enterprise-grade security.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes, create up to 3 videos per month with watermarks. Paid plans start at $19/month with unlimited videos, no watermarks, and access to all premium features including voice cloning.",
  },
  {
    question: "How accurate is the lip-sync?",
    answer:
      "Our lip-sync technology achieves 99.2% accuracy using advanced facial landmark detection and neural audio-visual synchronization. Videos look natural and professional across all languages.",
  },
]

export default function HomePage() {
  const [activeCard, setActiveCard] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % videoCards.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const nextCard = () => setActiveCard((prev) => (prev + 1) % videoCards.length)
  const prevCard = () => setActiveCard((prev) => (prev - 1 + videoCards.length) % videoCards.length)
  const handleCardClick = (index: number) => setActiveCard(index)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <div
        className="fixed w-6 h-6 bg-white/20 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out hidden lg:block"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: "scale(1)",
        }}
      />

      <div className="fixed inset-0 opacity-20 lg:opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-pink-500/10" />
        <div className="absolute top-0 left-1/4 w-48 h-48 lg:w-96 lg:h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 lg:w-80 lg:h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-36 h-36 lg:w-72 lg:h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="relative group">
                <OmniAvataarLogo size={48} variant="gradient" className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  OmniAvataar
                </h1>
                <p className="text-xs text-gray-400 -mt-1 hidden lg:block">Next-Gen AI Video</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {["Features", "Pricing", "API"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-all duration-300 relative group font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}

              <div className="flex items-center space-x-4">
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 font-medium transition-all duration-300 hover:scale-105 border-0 rounded-xl">
                    Start Free
                  </Button>
                </Link>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-in slide-in-from-top duration-300">
              <div className="space-y-4">
                {["Features", "Pricing", "API"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-gray-300 hover:text-white transition-all duration-300 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="flex flex-col space-y-3 pt-4">
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="w-full text-gray-300 hover:text-white hover:bg-white/10">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium transition-all duration-300 border-0 rounded-xl">
                      Start Free
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="pt-28 lg:pt-32 pb-56 lg:pb-32 px-4 lg:px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content - Left Side */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-8 lg:space-y-10 text-center lg:text-left pt-4 lg:pt-6">
              <div className="space-y-4 lg:space-y-6">
                <div className="flex justify-center lg:justify-start">
                  <div className="px-3 lg:px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full">
                    <span className="text-orange-400 font-medium text-xs lg:text-sm">
                      🚀 3x Faster Than Competition
                    </span>
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    AI Avatar for Everyone
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                    and Everything
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                  Create professional AI videos in 60 seconds with voice cloning, 75+ languages, and 4K quality.
                  <span className="text-white font-medium"> No studio required.</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 border-0 rounded-xl group"
                  >
                    Start Creating Now
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold bg-transparent transition-all duration-300 hover:scale-105 rounded-xl"
                >
                  <Play className="w-4 h-4 lg:w-5 lg:h-5 mr-3" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-6 lg:space-x-8 pt-4">
                <div className="text-center lg:text-left">
                  <div className="text-xl lg:text-2xl font-bold text-white">500K+</div>
                  <div className="text-xs lg:text-sm text-gray-400">Videos Created</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl lg:text-2xl font-bold text-white">75+</div>
                  <div className="text-xs lg:text-sm text-gray-400">Languages</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl lg:text-2xl font-bold text-white">60s</div>
                  <div className="text-xs lg:text-sm text-gray-400">Generation Time</div>
                </div>
              </div>
            </div>

            {/* Video Cards - Right Side */}
            <div className="relative w-full max-w-[160px] sm:max-w-[200px] lg:max-w-[240px] mx-auto h-20 sm:h-32 lg:h-44 flex items-center justify-center mb-28 sm:mb-0">
              {videoCards.map((card, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full aspect-[9/16] cursor-pointer transition-all duration-700 ease-out ${
                    index === activeCard
                      ? "scale-100 opacity-100 z-10 rotate-0"
                      : index === (activeCard + 1) % videoCards.length
                        ? "scale-65 sm:scale-85 lg:scale-90 opacity-40 lg:opacity-60 z-5 rotate-1 sm:rotate-2 lg:rotate-2 translate-x-1 sm:translate-x-6 lg:translate-x-8"
                      : index === (activeCard + 2) % videoCards.length
                        ? "scale-55 sm:scale-75 lg:scale-80 opacity-30 lg:opacity-50 z-4 rotate-1 sm:rotate-3 lg:rotate-3 translate-x-2 sm:translate-x-12 lg:translate-x-16"
                      : index === (activeCard - 1 + videoCards.length) % videoCards.length
                        ? "scale-65 sm:scale-85 lg:scale-90 opacity-40 lg:opacity-60 z-5 -rotate-1 sm:-rotate-2 lg:-rotate-2 -translate-x-1 sm:-translate-x-6 lg:-translate-x-8"
                      : index === (activeCard - 2 + videoCards.length) % videoCards.length
                        ? "scale-55 sm:scale-75 lg:scale-80 opacity-30 lg:opacity-50 z-4 -rotate-1 sm:-rotate-3 lg:-rotate-3 -translate-x-2 sm:-translate-x-12 lg:-translate-x-16"
                          : "scale-45 sm:scale-65 lg:scale-70 opacity-20 lg:opacity-30 z-0"
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="relative w-full h-full rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/20 shadow-2xl shadow-black/50 hover:border-orange-500/30 transition-all duration-300">
                    {card.videoUrl ? (
                      <video
                        className="w-full h-full object-cover"
                        src={card.videoUrl}
                        poster={card.thumbnailUrl || "/placeholder.svg"}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={card.thumbnailUrl || "/placeholder.svg"}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-3 lg:top-4 left-3 lg:left-4 right-3 lg:right-4 flex justify-between">
                      <div className="bg-white/90 text-black px-2 lg:px-3 py-1 rounded-full text-xs font-medium">
                        {card.category}
                      </div>
                      <div className="bg-black/60 text-white px-2 lg:px-3 py-1 rounded-full text-xs font-medium">
                        {card.duration}
                      </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg">
                        <Play className="text-black fill-black w-4 h-4 lg:w-5 lg:h-5 ml-0.5 lg:ml-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                      <h3 className="font-bold text-white text-base lg:text-lg mb-2 lg:mb-4">{card.title}</h3>
                      <p className="text-white/80 text-sm mb-3 line-clamp-2">{card.description}</p>
                      <div className="flex items-center gap-3 lg:gap-4 text-sm text-white/70">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                          {card.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 lg:w-4 lg:h-4" />
                          {card.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-4 lg:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Built for professionals
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
              Enterprise-grade features that scale with your business
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group p-6 lg:p-8 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-2xl lg:rounded-3xl hover:border-orange-500/30 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-sm active:scale-95"
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <benefit.icon className="w-6 h-6 lg:w-8 lg:h-8 text-orange-400" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4 group-hover:text-orange-100 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-sm lg:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-4 lg:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Three steps to magic
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500/50 via-red-500/50 to-pink-500/50 -translate-y-1/2" />

            <div className="grid lg:grid-cols-3 gap-12 lg:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center group">
                  <div className="relative inline-block mb-6 lg:mb-8">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl lg:rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl shadow-orange-500/25">
                      <step.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 lg:w-8 lg:h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4 group-hover:text-orange-100 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-sm lg:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-4 lg:px-6 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Loved by creators
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 lg:p-8 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl lg:rounded-3xl hover:border-orange-500/30 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-sm group active:scale-95"
              >
                <div className="flex items-center mb-4 lg:mb-6">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full mr-3 lg:mr-4 border-2 border-white/20"
                  />
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-orange-100 transition-colors duration-300 text-sm lg:text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs lg:text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-3 lg:mb-4 group-hover:text-gray-200 transition-colors duration-300 text-sm lg:text-base">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 lg:w-4 lg:h-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Questions & Answers
              </span>
            </h2>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl lg:rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 lg:p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300 group active:scale-[0.99]"
                >
                  <h3 className="font-semibold text-white text-base lg:text-lg pr-4 group-hover:text-orange-100 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <Plus
                    className={`w-5 h-5 text-gray-400 transition-all duration-300 group-hover:text-orange-400 flex-shrink-0 ${
                      openFaq === index ? "rotate-45" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 lg:px-6 pb-4 lg:pb-6 border-t border-white/10">
                    <p className="text-gray-300 pt-3 lg:pt-4 leading-relaxed text-sm lg:text-base">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 px-4 lg:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to create?
              </span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-400 mb-6 lg:mb-8 max-w-2xl mx-auto">
              Join 500,000+ creators making professional videos in seconds
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg font-semibold transition-all duration-300 hover:scale-105 border-0 rounded-xl active:scale-95"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
