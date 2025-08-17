"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Sparkles, Crown, Zap, ArrowRight, Star } from "lucide-react"

const pricingPlans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out OmniAvatar",
    monthlyPrice: 0,
    yearlyPrice: 0,
    credits: 3,
    features: [
      "3 avatar generations per month",
      "Basic avatar styles",
      "Standard video quality",
      "Community support",
      "Watermarked videos",
    ],
    limitations: ["Limited customization options", "No commercial usage", "Basic export formats"],
    popular: false,
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const,
  },
  {
    id: "creator",
    name: "Creator",
    description: "For content creators and individuals",
    monthlyPrice: 19,
    yearlyPrice: 190,
    credits: 50,
    features: [
      "50 avatar generations per month",
      "All avatar styles",
      "HD video quality",
      "Priority support",
      "No watermarks",
      "Commercial usage rights",
      "Advanced customization",
      "Multiple export formats",
    ],
    limitations: [],
    popular: true,
    buttonText: "Start Creating",
    buttonVariant: "default" as const,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and small teams",
    monthlyPrice: 49,
    yearlyPrice: 490,
    credits: 150,
    features: [
      "150 avatar generations per month",
      "All premium features",
      "4K video quality",
      "Priority support",
      "API access",
      "Team collaboration (up to 5 users)",
      "Custom branding",
      "Analytics dashboard",
      "Bulk operations",
    ],
    limitations: [],
    popular: false,
    buttonText: "Go Pro",
    buttonVariant: "default" as const,
  },
  {
    id: "business",
    name: "Business",
    description: "For agencies and large organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    credits: 500,
    features: [
      "500 avatar generations per month",
      "Everything in Pro",
      "Unlimited team members",
      "White-label solution",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Advanced analytics",
      "Priority feature requests",
    ],
    limitations: [],
    popular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const,
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const getPrice = (plan: (typeof pricingPlans)[0]) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice
  }

  const getSavings = (plan: (typeof pricingPlans)[0]) => {
    if (plan.monthlyPrice === 0) return 0
    const yearlyTotal = plan.monthlyPrice * 12
    const savings = yearlyTotal - plan.yearlyPrice
    return Math.round((savings / yearlyTotal) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
          </div>
          <span className="font-sans font-bold text-2xl bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            OmniAvatar
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="font-serif" asChild>
            <a href="/">Back to Home</a>
          </Button>
          <Button variant="outline" className="font-serif bg-transparent">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Pricing Header */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full px-4 py-2 mb-6">
          <Crown className="w-4 h-4 text-primary" />
          <span className="font-serif text-sm font-medium text-slate-700">Simple, Transparent Pricing</span>
        </div>

        <h1 className="font-sans text-5xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Choose Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Perfect Plan
          </span>
        </h1>

        <p className="font-serif text-xl text-slate-600 mb-8 leading-relaxed">
          Start free and scale as you grow. All plans include our core avatar generation features.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center space-x-4 mb-12">
          <span className={`font-serif font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} />
          <span className={`font-serif font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Yearly
          </span>
          {isYearly && (
            <Badge variant="secondary" className="font-serif ml-2">
              Save up to 20%
            </Badge>
          )}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-primary shadow-lg scale-105 bg-gradient-to-br from-white to-primary/5"
                  : "hover:scale-105"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="font-serif bg-gradient-to-r from-primary to-accent text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  {plan.id === "free" && <Sparkles className="w-8 h-8 text-slate-500" />}
                  {plan.id === "creator" && <Zap className="w-8 h-8 text-primary" />}
                  {plan.id === "pro" && <Crown className="w-8 h-8 text-accent" />}
                  {plan.id === "business" && <Star className="w-8 h-8 text-orange-500" />}
                </div>

                <CardTitle className="font-sans text-2xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="font-serif text-sm">{plan.description}</CardDescription>

                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="font-sans text-4xl font-bold">${getPrice(plan)}</span>
                    <span className="font-serif text-muted-foreground ml-1">/{isYearly ? "year" : "month"}</span>
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <div className="mt-2">
                      <Badge variant="outline" className="font-serif text-xs">
                        Save {getSavings(plan)}%
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="font-sans text-2xl font-bold text-primary">{plan.credits}</div>
                  <div className="font-serif text-sm text-muted-foreground">credits per month</div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="font-serif text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full font-serif ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                      : ""
                  }`}
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans text-3xl font-bold mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              {
                question: "What happens if I exceed my monthly credits?",
                answer:
                  "You can purchase additional credit packs or upgrade to a higher plan. We'll notify you before you run out of credits.",
              },
              {
                question: "Can I change my plan anytime?",
                answer:
                  "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "We offer a 30-day money-back guarantee for all paid plans. Contact support if you're not satisfied.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, PayPal, and bank transfers through our secure payment processor.",
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-sans font-semibold text-lg">{faq.question}</h3>
                <p className="font-serif text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
