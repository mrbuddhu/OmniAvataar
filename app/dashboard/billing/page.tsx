"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { CreditCard, Download, Crown, Zap, ArrowUpRight, CheckCircle, Plus, Settings } from "lucide-react"

// Mock data
const mockSubscription = {
  plan: "Pro",
  status: "active",
  currentPeriodStart: "2024-01-15",
  currentPeriodEnd: "2024-02-15",
  price: 49,
  creditsIncluded: 150,
  creditsUsed: 73,
  creditsRemaining: 77,
  nextBillingDate: "2024-02-15",
  cancelAtPeriodEnd: false,
}

const mockInvoices = [
  {
    id: "inv_001",
    date: "2024-01-15",
    amount: 49,
    status: "paid",
    description: "Pro Plan - Monthly",
    downloadUrl: "#",
  },
  {
    id: "inv_002",
    date: "2023-12-15",
    amount: 49,
    status: "paid",
    description: "Pro Plan - Monthly",
    downloadUrl: "#",
  },
  {
    id: "inv_003",
    date: "2023-11-15",
    amount: 19,
    status: "paid",
    description: "Creator Plan - Monthly",
    downloadUrl: "#",
  },
]

const mockPaymentMethods = [
  {
    id: "pm_001",
    type: "card",
    brand: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_002",
    type: "card",
    brand: "mastercard",
    last4: "5555",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
  },
]

export default function BillingPage() {
  const [isUpgrading, setIsUpgrading] = useState(false)

  const creditUsagePercentage = (mockSubscription.creditsUsed / mockSubscription.creditsIncluded) * 100

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="font-sans text-3xl font-bold">Billing & Subscription</h1>
            <p className="font-serif text-muted-foreground">Manage your subscription and billing information</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-serif bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Buy Credits
            </Button>
            <Button className="font-serif bg-gradient-to-r from-primary to-accent">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        </div>

        {/* Current Subscription */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <CardTitle className="font-sans">Current Plan</CardTitle>
                </div>
                <Badge
                  variant={mockSubscription.status === "active" ? "default" : "secondary"}
                  className="font-serif capitalize"
                >
                  {mockSubscription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-sans text-3xl font-bold">{mockSubscription.plan}</span>
                  <span className="font-serif text-muted-foreground">${mockSubscription.price}/month</span>
                </div>
                <p className="font-serif text-sm text-muted-foreground">
                  Next billing: {new Date(mockSubscription.nextBillingDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="outline" size="sm" className="font-serif bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Plan
                </Button>
                <Button variant="ghost" size="sm" className="font-serif text-muted-foreground">
                  Cancel Subscription
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                <CardTitle className="font-sans">Credit Usage</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-sm">Credits Used</span>
                  <span className="font-sans font-semibold">
                    {mockSubscription.creditsUsed} / {mockSubscription.creditsIncluded}
                  </span>
                </div>
                <Progress value={creditUsagePercentage} className="h-2" />
                <p className="font-serif text-xs text-muted-foreground mt-2">
                  {mockSubscription.creditsRemaining} credits remaining this month
                </p>
              </div>

              <div className="pt-4 border-t">
                <Button size="sm" className="font-serif w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Buy Additional Credits
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Details */}
        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="invoices" className="font-serif">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="payment-methods" className="font-serif">
              Payment Methods
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Billing History</CardTitle>
                <CardDescription className="font-serif">
                  Download your invoices and view payment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-sans font-medium">{invoice.description}</p>
                          <p className="font-serif text-sm text-muted-foreground">
                            {new Date(invoice.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-sans font-semibold">${invoice.amount}</p>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="font-serif text-xs text-green-600 capitalize">{invoice.status}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-sans">Payment Methods</CardTitle>
                    <CardDescription className="font-serif">Manage your saved payment methods</CardDescription>
                  </div>
                  <Button className="font-serif">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Method
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPaymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-sans font-medium capitalize">
                              {method.brand} •••• {method.last4}
                            </p>
                            {method.isDefault && (
                              <Badge variant="secondary" className="font-serif text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="font-serif text-sm text-muted-foreground">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!method.isDefault && (
                          <Button variant="ghost" size="sm" className="font-serif">
                            Set Default
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="font-serif text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
