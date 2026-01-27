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
  OTP_REQUEST: "/api/otp/request",
  OTP_VERIFY: "/api/otp/verify",
  UNIVERSITIES: "/api/universities",
  INSTITUTION_FACULTIES: (code: string) => `/institutions/${code}/faculties`,
} as const;

// Backend API endpoints - actual backend server paths (proxied)
export const BACKEND_API_ENDPOINTS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  OTP_REQUEST: "/api/auth/request-otp",
  OTP_VERIFY: "/api/auth/verify-otp",
  UNIVERSITIES: "/universities",
  INSTITUTION_FACULTIES: (code: string) => `/institutions/${code}/faculties`,
} as const;
