import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
    return (
        <div className="container mx-auto py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Application Submitted Successfully!</h1>
            <p className="text-xl mb-8">
                Thank you for submitting your ASI Membership Application. We have received your application and payment.
            </p>
            <p className="mb-8">We will review your application and contact you soon with further information.</p>
            <Button asChild>
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
    )
}

