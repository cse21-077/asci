"use client"

import React, { useState } from "react"
import { useFormContext } from "../app/contexts/FormContext"
import { Button } from "@/components/ui/button"
import { validateForm } from "../app/utils/formValidation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// ... (previous imports and type definitions)

export default function MultiStepForm({ steps, onSubmit }: MultiStepFormProps) {
  const { formData, updateFormData, currentStep, setCurrentStep } = useFormContext()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const CurrentStepComponent = steps[currentStep].component

  const handleNext = () => {
    const stepErrors = validateForm(formData)
    setErrors(stepErrors)

    if (Object.keys(stepErrors).length === 0) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    const formErrors = validateForm(formData)
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      onSubmit()
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
        <div className="flex mb-4">
          {steps.map((step, index) => (
            <div key={index} className={`flex-1 h-2 ${index <= currentStep ? "bg-blue-500" : "bg-gray-200"}`} />
          ))}
        </div>
      </div>
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Please correct the following errors:
            <ul className="list-disc list-inside">
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <CurrentStepComponent />
      <div className="mt-8 flex justify-between">
        {currentStep > 0 && <Button onClick={handlePrevious}>Previous</Button>}
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </div>
    </div>
  )
}

