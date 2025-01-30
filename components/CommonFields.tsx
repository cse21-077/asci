"use client"

import type React from "react"
import { useFormContext } from "../app/contexts/FormContext"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select"

export default function CommonFields() {
  const { formData, updateFormData } = useFormContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string, name?: string) => {
    if (typeof e === "string") {
      updateFormData({ [name!]: e })
    } else {
      updateFormData({ [e.target.name]: e.target.value })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="dateOfApplication">Date of Application</Label>
        <Input
          type="date"
          id="dateOfApplication"
          name="dateOfApplication"
          value={formData.dateOfApplication || new Date().toISOString().split("T")[0]}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Select name="title" value={formData.title || ""} onValueChange={(value) => updateFormData({ title: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a title" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mr">Mr</SelectItem>
            <SelectItem value="Mrs">Mrs</SelectItem>
            <SelectItem value="Ms">Ms</SelectItem>
            <SelectItem value="Dr">Dr</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="surname">Surname</Label>
        <Input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname || ""}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" value={formData.email || ""} onChange={handleChange} required />
      </div>
      {/* Add more fields for phone numbers, email, website, Skype, and address */}
    </div>
  )
}

