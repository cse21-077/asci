import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function PaymentCancelled() {
  return (
    <div className="container mx-auto py-8">
      <Alert variant="destructive">
        <AlertTitle>Payment Cancelled</AlertTitle>
          <AlertDescription>
            Your payment has been cancelled. If you&amp;apos;d like to try again, please return to the application form.
          </AlertDescription>
      </Alert>
      <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
        Return to Home
      </Link>
    </div>
  )
}

