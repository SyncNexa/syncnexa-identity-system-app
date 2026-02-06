// App routes - user-facing pages
export const APP_ROUTES = {
  INDEX: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SIGNUP_VERIFY: "/signup/verify",
  RECOVER_PASSWORD: "/login/recover-password",
  SESSION_EXPIRED: "/session-expired",
  OVERVIEW: "/dashboard/overview",
  IDENTITY: "/dashboard/identity",
  VERIFICATION: "/dashboard/verification",
  DOCUMENTS: "/dashboard/documents",
  APPS: "/dashboard/apps",
  SECURITY: "/dashboard/security",
  SETTINGS: "/dashboard/settings",
  LOGOUT: "/logout",
} as const;

// API routes - backend endpoints (Next.js API routes)
export const API_ROUTES = {
  LOGIN: "/api/login",
  SIGNUP: "/api/signup",
  LOGOUT: "/api/auth/logout",
  REFRESH_TOKEN: "/api/auth/refresh-token",
  OTP_REQUEST: "/api/otp/request",
  OTP_VERIFY: "/api/otp/verify",
  VERIFY_EMAIL_REQUEST: "/api/verify-email/request",
  VERIFY_EMAIL: "/api/verify-email",
  VERIFY_EMAIL_RESEND: "/api/verify-email/resend",
  UNIVERSITIES: "/api/universities",
  INSTITUTION_FACULTIES: (code: string) =>
    `/api/institutions/${code}/faculties`,
  INSTITUTION_PROGRAMS: (code: string) => `/api/institutions/${code}/programs`,
  USER_VERIFICATION_CENTER: "/api/user/verification-center",
  USER_SECURITY: "/api/user/security",
  USER_ME: "/api/user/me",
  USER_PERSONAL_INFO: "/api/user/personal-info",
  USER_ACADEMIC_DETAILS: "/api/user/academic-details",
} as const;

// Backend API endpoints - actual backend server paths (proxied)
export const BACKEND_API_ENDPOINTS = {
  LOGIN: "/auth/login",
  SIGNUP: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh-token",
  OTP_REQUEST: "/auth/request-otp",
  OTP_VERIFY: "/auth/verify-otp",
  VERIFY_EMAIL_REQUEST: "/auth/verify-email/request",
  VERIFY_EMAIL: "/auth/verify-email",
  VERIFY_EMAIL_RESEND: "/auth/verify-email/resend",
  UNIVERSITIES: "/universities",
  INSTITUTION_FACULTIES: (code: string) => `/institutions/${code}/faculties`,
  INSTITUTION_PROGRAMS: (code: string) => `/institutions/${code}/programs`,
  USER_VERIFICATION_CENTER: "/user/verification-center",
  USER_SECURITY: "/security",
  USER_ME: "/user/me",
  USER_PERSONAL_INFO: "/user/personal-info",
  USER_ACADEMIC_DETAILS: "/user/academic-details",
} as const;
