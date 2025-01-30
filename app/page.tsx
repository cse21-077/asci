import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Image src="/asi.png" alt="ASI Logo" width={200} height={100} className="mb-8" />
      <h1 className="text-4xl font-bold mb-4 text-center">ASI Membership Application</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Join ASI and become part of a network of professionals and organizations committed to supporting the mission of
        the Seventh-day Adventist Church.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/apply/individual">Individual Application</Link>
        </Button>
        <Button asChild>
          <Link href="/apply/organization">Organization Application</Link>
        </Button>
      </div>
    </div>
  )
}

