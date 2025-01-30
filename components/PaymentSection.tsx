"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { loadStripe } from "@stripe/stripe-js"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {useFormContext} from "@/app/contexts/FormContext";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PaymentSection() {
  const { formData, calculateMembershipFee } = useFormContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fee = calculateMembershipFee()

  const handleSubmitAndPay = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Submit form data
      const submitResponse = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!submitResponse.ok) {
        throw new Error("Failed to submit application")
      }

      const { data: application } = await submitResponse.json()

      // Create Stripe checkout session
      const checkoutResponse = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: fee * 100,
          applicationId: application.id,
        }),
      })

      if (!checkoutResponse.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { sessionId } = await checkoutResponse.json()

      // Initialize Stripe
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Failed to load Stripe")
      }

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) {
        throw error
      }
    } catch (err) {
      console.error("Error:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setIsSubmitting(false)
    }
  }

  return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
          )}
          <div className="space-y-2">
            <h3 className="font-semibold">Membership Fee Breakdown:</h3>
            <div className="pl-4">
              <p>Base Fee: P{Math.floor(fee)}</p>
              {formData.organizationCategory === "forProfit40+" && Number.parseInt(formData.employeeCount) > 40 && (
                  <p>Additional Employee Fee: P{(fee - Math.floor(fee)).toFixed(2)}</p>
              )}
              <p className="font-bold mt-2">Total Fee: P{fee.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <p>
              <strong>Account Holder:</strong> South Botswana Conference of SDA Church
            </p>
            <p>
              <strong>Bank:</strong> Standard Chartered Bank
            </p>
            <p>
              <strong>Branch Code:</strong> 662167
            </p>
            <p>
              <strong>Account Number:</strong> 0100150418700
            </p>
            <p>
              <strong>Account Type:</strong> Cheque Account
            </p>
            <p>
              <strong>Payment Reference:</strong> SBC ASI MEMBERSHIP 2023 {formData.firstName} {formData.surname}
            </p>
          </div>

          <Button onClick={handleSubmitAndPay} className="w-full mt-4" disabled={isSubmitting || fee === 0}>
            {isSubmitting ? "Processing..." : "Submit Application and Pay"}
          </Button>
        </CardContent>
      </Card>
  )
}

