"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useFormContext} from "@/app/contexts/FormContext";

export default function IndividualFields() {
    const { formData, updateFormData } = useFormContext()

    const handleCategoryChange = (value: string) => {
        updateFormData({
            membershipCategory: value,
            applicationType: "individual",
            // Reset organization-specific fields
            organizationCategory: "",
            employeeCount: "",
            organizationName: "",
            businessType: "",
            yearStarted: "",
        })
    }

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="professionalQualifications">Professional Qualifications</Label>
                <Input
                    type="text"
                    id="professionalQualifications"
                    name="professionalQualifications"
                    value={formData.professionalQualifications || ""}
                    onChange={(e) => updateFormData({ professionalQualifications: e.target.value })}
                    required
                />
            </div>
            <div>
                <Label htmlFor="membershipCategory">Membership Category</Label>
                <Select value={formData.membershipCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="specialist">B1: Specialist Providing Independent Consultancy Services</SelectItem>
                        <SelectItem value="executiveEmployee">B2: Employee at Executive Level</SelectItem>
                        <SelectItem value="managerialEmployee">B3: Employee at Managerial Level</SelectItem>
                        <SelectItem value="professionalEmployee">B4: Professional Level</SelectItem>
                        <SelectItem value="youngProfessional">B5: Young Professional</SelectItem>
                        <SelectItem value="retiredProfessional">B6: Retired Professional</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

