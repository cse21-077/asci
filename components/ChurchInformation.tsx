"use client"

import type React from "react"
import { useFormContext } from "../app/contexts/FormContext"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ChurchInformation() {
  const { formData, updateFormData } = useFormContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="homeChurchName">Home Church Name</Label>
        <Input
          type="text"
          id="homeChurchName"
          name="homeChurchName"
          value={formData.homeChurchName || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="pastorName">Pastor's Name</Label>
        <Input
          type="text"
          id="pastorName"
          name="pastorName"
          value={formData.pastorName || ""}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  )
}