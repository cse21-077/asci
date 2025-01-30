export interface FeeCalculatorParams {
  membershipType: "organizational" | "professional"
  subCategory: string
  employeeCount?: number
}

export function calculateFee({ membershipType, subCategory, employeeCount }: FeeCalculatorParams): number {
  if (membershipType === "organizational") {
    // A. ORGANIZATIONAL MEMBER
    switch (subCategory) {
      case "nonProfit": // A1
        return 100
      case "forProfit2-9Sole": // A2a
      case "forProfit2-9": // A2b
        return 100
      case "forProfit10-25": // A2c
        return 200
      case "forProfit26-40": // A2d
        return 200
      case "forProfit40+": // A2e
        if (employeeCount && employeeCount > 40) {
          const additionalEmployees = employeeCount - 40
          return 200 + additionalEmployees * 10.5
        }
        return 200
      default:
        return 0
    }
  } else if (membershipType === "professional") {
    // B. PROFESSIONAL MEMBER
    switch (subCategory) {
      case "specialist": // B1
        return 100
      case "executiveEmployee": // B2
        return 200
      case "managerialEmployee": // B3
        return 100
      case "professionalEmployee": // B4
        return 100
      case "youngProfessional": // B5
        return 50
      case "retiredProfessional": // B6
        return 50
      default:
        return 0
    }
  }
  return 0
}

export function generatePaymentReference(name: string): string {
  return `SBC ASI MEMBERSHIP 2023 ${name.toUpperCase().replace(/[^A-Z0-9]/g, "")}`
}

