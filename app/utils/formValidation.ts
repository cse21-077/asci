interface FormData {
  firstName?: string;
  surname?: string;
  email?: string;
  homePhone?: string;
  workPhone?: string;
  mobile?: string;
  applicationType?: "" | "organization" | "individual";
  organizationName?: string;
  employeeCount?: string;
  yearStarted?: string;
  professionalQualifications?: string;
  membershipCategory?: string;
  [key: string]: string | number | boolean | undefined; // Restrict dynamic properties
}


export const validateForm = (formData: FormData) => {
  const errors: { [key: string]: string } = {};

  // Validate common fields
  if (!formData.firstName) errors.firstName = "First name is required";
  if (!formData.surname) errors.surname = "Surname is required";
  if (!formData.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";

  // Validate phone numbers
  const phoneFields = ["homePhone", "workPhone", "mobile"] as const;
  phoneFields.forEach((field) => {
    const phoneNumber = formData[field];
    if (phoneNumber && !/^\+?[\d\s-]+$/.test(phoneNumber)) {
      errors[field] = "Invalid phone number format";
    }
  });

  // Validate organization-specific fields
  if (formData.applicationType === "organization") {
    if (!formData.organizationName) errors.organizationName = "Organization name is required";
    if (!formData.employeeCount) errors.employeeCount = "Employee count is required";
    if (!formData.yearStarted) errors.yearStarted = "Year started is required";
  }

  // Validate individual-specific fields
  if (formData.applicationType === "individual") {
    if (!formData.professionalQualifications)
      errors.professionalQualifications = "Professional qualifications are required";
    if (!formData.membershipCategory) errors.membershipCategory = "Membership category is required";
  }

  return errors;
};