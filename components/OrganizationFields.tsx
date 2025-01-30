"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {useFormContext} from "@/app/contexts/FormContext";

export default function OrganizationFields() {
    const { formData, updateFormData } = useFormContext()

    const handleCategoryChange = (value: string) => {
        updateFormData({
            organizationCategory: value,
            applicationType: "organization",
            // Reset individual-specific fields
            membershipCategory: "",
            professionalQualifications: "",
        })
    }

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="organizationName">Name of Organization</Label>
                <Input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName || ""}
                    onChange={(e) => updateFormData({ organizationName: e.target.value })}
                    required
                />
            </div>
            <div>
                <Label htmlFor="businessType">Specific Type of Business/Service</Label>
                <Input
                    type="text"
                    id="businessType"
                    name="businessType"
                    value={formData.businessType || ""}
                    onChange={(e) => updateFormData({ businessType: e.target.value })}
                    required
                />
            </div>
            <div>
                <Label htmlFor="employeeCount">Total Number of Employees</Label>
                <Input
                    type="number"
                    id="employeeCount"
                    name="employeeCount"
                    value={formData.employeeCount || ""}
                    onChange={(e) => updateFormData({ employeeCount: e.target.value })}
                    required
                />
            </div>
            <div>
                <Label htmlFor="yearStarted">Year Operation Began</Label>
                <Input
                    type="number"
                    id="yearStarted"
                    name="yearStarted"
                    value={formData.yearStarted || ""}
                    onChange={(e) => updateFormData({ yearStarted: e.target.value })}
                    required
                />
            </div>
            <div>
                <Label htmlFor="organizationCategory">Organization Category</Label>
                <Select value={formData.organizationCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="nonProfit">A1: Non-Profit Organization</SelectItem>
                        <SelectItem value="forProfit2-9Sole">A2a: 2-9 Sole Proprietary</SelectItem>
                        <SelectItem value="forProfit2-9">A2b: 2-9 Employees</SelectItem>
                        <SelectItem value="forProfit10-25">A2c: 10-25 Employees</SelectItem>
                        <SelectItem value="forProfit26-40">A2d: 26-40 Employees</SelectItem>
                        <SelectItem value="forProfit40+">A2e: 40+ Employees</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {formData.organizationCategory === "forProfit40+" && (
                <div>
                    <Label htmlFor="employeeCountExact">Exact Employee Count</Label>
                    <Input
                        type="number"
                        id="employeeCountExact"
                        name="employeeCountExact"
                        value={formData.employeeCountExact || ""}
                        onChange={(e) => updateFormData({ employeeCountExact: e.target.value })}
                        min="41"
                        required
                    />
                </div>
            )}
        </div>
    )
}

