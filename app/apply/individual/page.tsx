"use client"

import { useRouter } from "next/navigation"
import { FormProvider } from "../../contexts/FormContext"
import { Button } from "@/components/ui/button"
import CommonFields from "@/components/CommonFields";
import ChurchInformation from "@/components/ChurchInformation"
import IndividualFields from "@/components/IndividualFields"
import PaymentSection from "@/components/PaymentSection"
import MultiStepForm from "@/components/MultiStepForm";



const steps = [
  { title: "Contact Information", component: CommonFields },
  { title: "Church Information", component: ChurchInformation },
  { title: "Professional Information", component: IndividualFields },
  { title: "Payment", component: PaymentSection },
]

function IndividualApplicationContent() {
  const router = useRouter()

  return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => router.push("/")} className="self-start sm:order-2">
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-center w-full sm:w-auto">Individual ASI Membership Application</h1>
        </div>
        <MultiStepForm steps={steps} />
      </div>
  )
}

export default function IndividualApplication() {
  return (
      <FormProvider>
        <IndividualApplicationContent />
      </FormProvider>
  )
}

