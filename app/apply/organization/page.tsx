"use client"

import { useRouter } from "next/navigation"
import { FormProvider } from "../../contexts/FormContext"
import { Button } from "@/components/ui/button"
import CommonFields from "@/components/CommonFields"
import ChurchInformation from "@/components/ChurchInformation"
import OrganizationFields from "@/components/OrganizationFields"
import PaymentSection from "@/components/PaymentSection";
import MultiStepForm from "@/components/MultiStepForm";


const steps = [
  { title: "Contact Information", component: CommonFields },
  { title: "Church Information", component: ChurchInformation },
  { title: "Organization Information", component: OrganizationFields },
  { title: "Payment", component: PaymentSection },
]

function OrganizationApplicationContent() {
  const router = useRouter()

  return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.push("/")} className="self-start sm:order-2">
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-center w-full sm:w-auto">Organization ASI Membership Application</h1>
        </div>
        <MultiStepForm steps={steps} />
      </div>
  )
}

export default function OrganizationApplication() {
  return (
      <FormProvider>
        <OrganizationApplicationContent />
      </FormProvider>
  )
}

