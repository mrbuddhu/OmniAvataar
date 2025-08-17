"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CreditCard, ArrowRight } from "lucide-react"
import { DodoPayments } from "@/lib/payments"

interface CheckoutButtonProps {
  planId: string
  planName: string
  price: number
  billingCycle: "monthly" | "yearly"
  popular?: boolean
  className?: string
}

export function CheckoutButton({ planId, planName, price, billingCycle, popular, className }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      console.log("[v0] Starting checkout process for:", planId, billingCycle)

      // Create checkout session with DodoPayments
      const { url } = await DodoPayments.createCheckoutSession(planId, billingCycle)

      console.log("[v0] Checkout session created, redirecting to:", url)

      // Redirect to DodoPayments checkout
      window.location.href = url
    } catch (error) {
      console.error("[v0] Checkout error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`w-full font-serif ${
        popular ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" : ""
      } ${className}`}
      variant={popular ? "default" : "outline"}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="w-4 h-4 mr-2" />
          {price === 0 ? "Get Started Free" : `Subscribe to ${planName}`}
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  )
}
