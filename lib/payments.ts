// Payment integration utilities for DodoPayments
export interface PaymentMethod {
  id: string
  type: "card" | "bank_account" | "paypal"
  brand?: string
  last4?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Subscription {
  id: string
  planId: string
  planName: string
  status: "active" | "cancelled" | "past_due" | "paused"
  currentPeriodStart: string
  currentPeriodEnd: string
  price: number
  currency: string
  billingCycle: "monthly" | "yearly"
  cancelAtPeriodEnd: boolean
  creditsIncluded: number
  creditsUsed: number
  creditsRemaining: number
}

export interface Invoice {
  id: string
  date: string
  amount: number
  currency: string
  status: "paid" | "pending" | "failed"
  description: string
  downloadUrl: string
  items: InvoiceItem[]
}

export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  credits: number
  features: string[]
  popular: boolean
}

// DodoPayments integration functions (mock implementations)
export class DodoPayments {
  private static apiKey: string = process.env.DODOPAYMENTS_API_KEY || ""
  private static baseUrl = "https://api.dodopayments.com/v1"

  static async createCheckoutSession(planId: string, billingCycle: "monthly" | "yearly"): Promise<{ url: string }> {
    // Mock implementation - replace with actual DodoPayments API call
    console.log("[v0] Creating checkout session for plan:", planId, billingCycle)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      url: `https://checkout.dodopayments.com/session_mock_${planId}_${billingCycle}`,
    }
  }

  static async createSubscription(customerId: string, planId: string, paymentMethodId: string): Promise<Subscription> {
    // Mock implementation
    console.log("[v0] Creating subscription:", { customerId, planId, paymentMethodId })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      id: `sub_${Date.now()}`,
      planId,
      planName: "Pro Plan",
      status: "active",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      price: 49,
      currency: "USD",
      billingCycle: "monthly",
      cancelAtPeriodEnd: false,
      creditsIncluded: 150,
      creditsUsed: 0,
      creditsRemaining: 150,
    }
  }

  static async updateSubscription(subscriptionId: string, planId: string): Promise<Subscription> {
    // Mock implementation
    console.log("[v0] Updating subscription:", subscriptionId, "to plan:", planId)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return updated subscription
    return {
      id: subscriptionId,
      planId,
      planName: "Business Plan",
      status: "active",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      price: 99,
      currency: "USD",
      billingCycle: "monthly",
      cancelAtPeriodEnd: false,
      creditsIncluded: 500,
      creditsUsed: 0,
      creditsRemaining: 500,
    }
  }

  static async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true): Promise<Subscription> {
    // Mock implementation
    console.log("[v0] Cancelling subscription:", subscriptionId, "at period end:", cancelAtPeriodEnd)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      id: subscriptionId,
      planId: "pro",
      planName: "Pro Plan",
      status: cancelAtPeriodEnd ? "active" : "cancelled",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      price: 49,
      currency: "USD",
      billingCycle: "monthly",
      cancelAtPeriodEnd,
      creditsIncluded: 150,
      creditsUsed: 73,
      creditsRemaining: 77,
    }
  }

  static async addPaymentMethod(customerId: string, paymentMethodData: any): Promise<PaymentMethod> {
    // Mock implementation
    console.log("[v0] Adding payment method for customer:", customerId)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      id: `pm_${Date.now()}`,
      type: "card",
      brand: "visa",
      last4: "4242",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: false,
    }
  }

  static async getInvoices(customerId: string): Promise<Invoice[]> {
    // Mock implementation
    console.log("[v0] Fetching invoices for customer:", customerId)

    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        id: "inv_001",
        date: new Date().toISOString(),
        amount: 49,
        currency: "USD",
        status: "paid",
        description: "Pro Plan - Monthly",
        downloadUrl: "/api/invoices/inv_001/download",
        items: [
          {
            description: "Pro Plan - Monthly Subscription",
            quantity: 1,
            unitPrice: 49,
            totalPrice: 49,
          },
        ],
      },
    ]
  }

  static async purchaseCredits(
    customerId: string,
    creditPackage: string,
  ): Promise<{ success: boolean; credits: number }> {
    // Mock implementation
    console.log("[v0] Purchasing credits:", creditPackage, "for customer:", customerId)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const creditPackages: Record<string, number> = {
      small: 25,
      medium: 50,
      large: 100,
      xl: 250,
    }

    return {
      success: true,
      credits: creditPackages[creditPackage] || 25,
    }
  }
}

// Utility functions
export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function calculateYearlySavings(monthlyPrice: number, yearlyPrice: number): number {
  const yearlyTotal = monthlyPrice * 12
  const savings = yearlyTotal - yearlyPrice
  return Math.round((savings / yearlyTotal) * 100)
}

export function getNextBillingDate(currentPeriodEnd: string): string {
  return new Date(currentPeriodEnd).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
