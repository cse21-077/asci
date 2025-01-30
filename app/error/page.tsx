import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ErrorPage() {
    return (
        <div className="container mx-auto py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-xl mb-8">
                We encountered an error processing your request. Please try again or contact support if the problem persists.
            </p>
            <Button asChild>
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
    )
}

