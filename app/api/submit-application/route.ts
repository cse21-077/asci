import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
    try {
        if (!req.body) {
            return NextResponse.json({ success: false, error: "No data provided" }, { status: 400 })
        }

        const formData = await req.json()

        // Validate required fields
        if (!formData.applicationType || !formData.firstName || !formData.surname) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
        }

        // Create the application in the database
        const application = await prisma.application.create({
            data: {
                applicationType: formData.applicationType,
                firstName: formData.firstName,
                surname: formData.surname,
                title: formData.title || null,
                email: formData.email || "",
                phoneHome: formData.phoneHome || null,
                phoneWork: formData.phoneWork || null,
                phoneMobile: formData.phoneMobile || null,
                websiteAddress: formData.websiteAddress || null,
                skypeAddress: formData.skypeAddress || null,
                address: formData.address || null,
                city: formData.city || null,
                postalCode: formData.postalCode || null,
                province: formData.province || null,
                country: formData.country || null,
                homeChurchName: formData.homeChurchName || null,
                pastorName: formData.pastorName || null,
                pastorPhone: formData.pastorPhone || null,
                pastorMobile: formData.pastorMobile || null,
                churchAddress: formData.churchAddress || null,
                churchCity: formData.churchCity || null,
                churchPostalCode: formData.churchPostalCode || null,
                churchProvince: formData.churchProvince || null,
                churchCountry: formData.churchCountry || null,
                localUnion: formData.localUnion || null,
                professionalQualifications: formData.professionalQualifications || null,
                membershipCategory: formData.membershipCategory || null,
                organizationName: formData.organizationName || null,
                businessType: formData.businessType || null,
                employeeCount: formData.employeeCount ? Number.parseInt(formData.employeeCount) : null,
                yearStarted: formData.yearStarted ? Number.parseInt(formData.yearStarted) : null,
                organizationCategory: formData.organizationCategory || null,
            },
        })

        return NextResponse.json({ success: true, data: application })
    } catch (error) {
        console.error("Error submitting application:", error)
        return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

