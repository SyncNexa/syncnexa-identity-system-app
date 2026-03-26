interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  country: string;
  state: string;
  address: string;
  gender: string;
  phone: string;
  academic_info: AcademicInfo;
}

interface AcademicInfo {
  institution: string;
  matric_number: string;
  degree: string;
  department: string;
  faculty: string;
  admission_year: number;
  student_level: string;
  graduation_year?: number;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
  type?: "info" | "warning" | "error";
}

interface LoginData {
  password: string;
  email: string;
}

interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  role: string; // Can only be 'student' | 'developer' | 'admin' | 'staff'
}

type LoginResponse = APIResponse<LoginData>;
type SignupResponse = APIResponse<SignupData>;
