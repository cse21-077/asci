"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface FormState {
  applicationType: "individual" | "organization" | ""
  membershipCategory: string
  organizationCategory: string
  employeeCount: string
  employeeCountExact: string
  firstName: string
  surname: string
  professionalQualifications: string
  organizationName: string
  businessType: string
  yearStarted: string
  // Add any other fields that are used in your form
}

interface FormContextType {
  formData: FormState
  updateFormData: (data: Partial<FormState>) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  calculateMembershipFee: () => number
}

const defaultFormState: FormState = {
  applicationType: "",
  membershipCategory: "",
  organizationCategory: "",
  employeeCount: "",
  employeeCountExact: "",
  firstName: "",
  surname: "",
  professionalQualifications: "",
  organizationName: "",
  businessType: "",
  yearStarted: "",
  // Initialize any other fields with empty strings or appropriate default values
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormState>(defaultFormState)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const savedData = localStorage.getItem("asiMembershipForm")
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  const calculateMembershipFee = () => {
    if (!formData.applicationType) return 0

    if (formData.applicationType === "organization") {
      switch (formData.organizationCategory) {
        case "nonProfit":
        case "forProfit2-9Sole":
        case "forProfit2-9":
          return 100
        case "forProfit10-25":
        case "forProfit26-40":
          return 200
        case "forProfit40+":
          const employeeCount = Number.parseInt(formData.employeeCount) || 0
          if (employeeCount > 40) {
            return 200 + (employeeCount - 40) * 10.5
          }
          return 200
        default:
          return 0
      }
    } else {
      switch (formData.membershipCategory) {
        case "specialist":
          return 100
        case "executiveEmployee":
          return 200
        case "managerialEmployee":
        case "professionalEmployee":
          return 100
        case "youngProfessional":
        case "retiredProfessional":
          return 50
        default:
          return 0
      }
    }
  }

  const updateFormData = (newData: Partial<FormState>) => {
    const updatedData = { ...formData, ...newData }
    setFormData(updatedData)
    localStorage.setItem("asiMembershipForm", JSON.stringify(updatedData))
  }

  return (
      <FormContext.Provider
          value={{
            formData,
            updateFormData,
            currentStep,
            setCurrentStep,
            calculateMembershipFee,
          }}
      >
        {children}
      </FormContext.Provider>
  )
}

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}

