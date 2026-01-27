import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Create a complete SignupData payload from form data
 * This matches the backend API expectations
 */
export function createSignupPayload(
  basicInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    state: string;
    address: string;
    gender: string;
    country: string;
    role: string;
  },
  academicInfo: {
    institution: string;
    matricNo: string;
    program: string;
    department: string;
    level: string;
    faculty: string;
    admissionYear: string;
    expectedGraduationYear?: string;
  },
): SignupData {
  // Parse phone number to E.164 format
  let phone = basicInfo.phone;
  if (phone) {
    const parsed = parsePhoneNumberFromString(phone);
    if (parsed && parsed.isValid()) {
      phone = parsed.number; // E.164 format
    } else {
      phone = phone.replace(/[^+0-9]/g, "");
    }
  }

  const payload: SignupData = {
    firstName: basicInfo.firstName.trim(),
    lastName: basicInfo.lastName.trim(),
    email: basicInfo.email.trim().toLowerCase(),
    password: basicInfo.password,
    phone: phone,
    role: basicInfo.role,
    country: basicInfo.country.trim(),
    state: basicInfo.state.trim(),
    address: basicInfo.address.trim(),
    gender: basicInfo.gender,
    academic_info: {
      institution: academicInfo.institution,
      matric_number: academicInfo.matricNo,
      program: academicInfo.program,
      department: academicInfo.department,
      faculty: academicInfo.faculty,
      admission_year: parseInt(academicInfo.admissionYear, 10),
      student_level: academicInfo.level,
      graduation_year: academicInfo.expectedGraduationYear
        ? parseInt(academicInfo.expectedGraduationYear, 10)
        : undefined,
    },
  };

  return payload;
}
