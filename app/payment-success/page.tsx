import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function PaymentSuccess() {
  return (
    <div className="container mx-auto py-8">
      <Alert>
        <AlertTitle>Payment Successful</AlertTitle>
        <AlertDescription>
          Your payment has been processed successfully. Thank you for your ASI membership application.
        </AlertDescription>
      </Alert>
      <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
        Return to Home
      </Link>
    </div>
  )
}

