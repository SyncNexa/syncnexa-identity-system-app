/**
 * Validation utilities for form inputs
 */

/**
 * Validate first name
 */
export function validateFirstName(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, message: "First name is required", type: "error" };
  }
  if (value.length < 2) {
    return {
      isValid: false,
      message: "First name must be at least 2 characters",
      type: "error",
    };
  }
  if (!/^[a-zA-Z\s'-]+$/.test(value)) {
    return {
      isValid: false,
      message:
        "First name can only contain letters, spaces, hyphens, and apostrophes",
      type: "error",
    };
  }
  return { isValid: true };
}

/**
 * Validate last name
 */
export function validateLastName(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, message: "Last name is required", type: "error" };
  }
  if (value.length < 2) {
    return {
      isValid: false,
      message: "Last name must be at least 2 characters",
      type: "error",
    };
  }
  if (!/^[a-zA-Z\s'-]+$/.test(value)) {
    return {
      isValid: false,
      message:
        "Last name can only contain letters, spaces, hyphens, and apostrophes",
      type: "error",
    };
  }
  return { isValid: true };
}

/**
 * Validate email address
 */
export function validateEmail(value: string): ValidationResult {
  if (!value.trim()) {
    return { isValid: false, message: "Email is required", type: "error" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return {
      isValid: false,
      message: "Please enter a valid email address",
      type: "error",
    };
  }

  // Check for common typos in popular domains
  const commonDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
  ];
  const domain = value.split("@")[1]?.toLowerCase();
  const typoSuggestions: { [key: string]: string } = {
    "gmail.con": "gmail.com",
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "yahooo.com": "yahoo.com",
    "yaho.com": "yahoo.com",
    "outlok.com": "outlook.com",
    "hotmial.com": "hotmail.com",
  };

  if (domain && typoSuggestions[domain]) {
    return {
      isValid: false,
      message: `Did you mean ${value.split("@")[0]}@${typoSuggestions[domain]}?`,
      type: "warning",
    };
  }

  return { isValid: true };
}

/**
 * Validate phone number
 */
export function validatePhone(value: string): ValidationResult {
  if (!value.trim()) {
    return {
      isValid: false,
      message: "Phone number is required",
      type: "error",
    };
  }

  // Remove all non-digit characters for validation
  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length < 10) {
    return {
      isValid: false,
      message: "Phone number must be at least 10 digits",
      type: "error",
    };
  }

  if (digitsOnly.length > 15) {
    return {
      isValid: false,
      message: "Phone number cannot exceed 15 digits",
      type: "error",
    };
  }

  return { isValid: true };
}

/**
 * Validate password strength
 */
export function validatePassword(value: string): ValidationResult {
  if (!value) {
    return { isValid: false, message: "Password is required", type: "error" };
  }

  if (value.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long",
      type: "error",
    };
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const strength = [
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  if (strength < 2) {
    return {
      isValid: false,
      message:
        "Password must include uppercase, lowercase, numbers, or special characters",
      type: "error",
    };
  }

  if (strength === 2) {
    return {
      isValid: true,
      message: "Password strength: Weak. Consider adding more character types",
      type: "warning",
    };
  }

  if (strength === 3) {
    return {
      isValid: true,
      message: "Password strength: Good",
      type: "info",
    };
  }

  return {
    isValid: true,
    message: "Password strength: Strong",
    type: "info",
  };
}

/**
 * Validate password confirmation
 */
export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): ValidationResult {
  if (!confirmPassword) {
    return {
      isValid: false,
      message: "Please confirm your password",
      type: "error",
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      message: "Passwords do not match",
      type: "error",
    };
  }

  return { isValid: true, message: "Passwords match", type: "info" };
}

/**
 * Validate state/province
 */
export function validateState(value: string): ValidationResult {
  if (!value.trim()) {
    return {
      isValid: false,
      message: "State/Province is required",
      type: "error",
    };
  }

  if (value.length < 2) {
    return {
      isValid: false,
      message: "State/Province must be at least 2 characters",
      type: "error",
    };
  }

  return { isValid: true };
}

/**
 * Validate address
 */
export function validateAddress(value: string): ValidationResult {
  if (!value.trim()) {
    return {
      isValid: false,
      message: "Home address is required",
      type: "error",
    };
  }

  if (value.length < 10) {
    return {
      isValid: false,
      message: "Please provide a complete address (at least 10 characters)",
      type: "error",
    };
  }

  return { isValid: true };
}

/**
 * Validate matric number
 */
export function validateMatricNo(value: string): ValidationResult {
  if (!value.trim()) {
    return {
      isValid: false,
      message: "Matric number is required",
      type: "error",
    };
  }

  // Typical matric number format: alphanumeric, usually 10-15 characters
  if (value.length < 6) {
    return {
      isValid: false,
      message: "Matric number seems too short",
      type: "error",
    };
  }

  if (!/^[A-Z0-9\/\-]+$/i.test(value)) {
    return {
      isValid: false,
      message:
        "Matric number can only contain letters, numbers, slashes, and hyphens",
      type: "error",
    };
  }

  return { isValid: true };
}

/**
 * Validate admission year
 */
export function validateAdmissionYear(value: string): ValidationResult {
  if (!value.trim()) {
    return {
      isValid: false,
      message: "Admission year is required",
      type: "error",
    };
  }

  const year = parseInt(value, 10);
  const currentYear = new Date().getFullYear();

  if (isNaN(year)) {
    return {
      isValid: false,
      message: "Please enter a valid year",
      type: "error",
    };
  }

  if (year < 1950 || year > currentYear + 1) {
    return {
      isValid: false,
      message: `Year must be between 1950 and ${currentYear + 1}`,
      type: "error",
    };
  }

  if (year > currentYear) {
    return {
      isValid: true,
      message: "Future admission year noted",
      type: "warning",
    };
  }

  return { isValid: true };
}

/**
 * Validate expected graduation year
 */
export function validateGraduationYear(
  admissionYear: string,
  graduationYear: string,
): ValidationResult {
  if (!graduationYear.trim()) {
    return {
      isValid: false,
      message: "Expected graduation year is required",
      type: "error",
    };
  }

  const gradYear = parseInt(graduationYear, 10);
  const currentYear = new Date().getFullYear();

  if (isNaN(gradYear)) {
    return {
      isValid: false,
      message: "Please enter a valid year",
      type: "error",
    };
  }

  if (gradYear < currentYear) {
    return {
      isValid: false,
      message: "Graduation year cannot be in the past",
      type: "error",
    };
  }

  if (admissionYear) {
    const admYear = parseInt(admissionYear, 10);
    if (!isNaN(admYear)) {
      const yearDiff = gradYear - admYear;
      if (yearDiff < 2) {
        return {
          isValid: false,
          message: "Graduation year must be at least 2 years after admission",
          type: "error",
        };
      }
      if (yearDiff > 10) {
        return {
          isValid: true,
          message: "That's quite a long program duration",
          type: "warning",
        };
      }
    }
  }

  return { isValid: true };
}
