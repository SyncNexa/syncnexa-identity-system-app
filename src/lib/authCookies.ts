/**
 * Server-side authentication cookie utilities
 * Use httpOnly cookies for secure token storage
 */

import { cookies } from "next/headers";

const ACCESS_TOKEN_KEY = "syncnexa_access_token";
const REFRESH_TOKEN_KEY = "syncnexa_refresh_token";
const SESSION_ID_KEY = "syncnexa_session_id";
const USER_ROLE_KEY = "syncnexa_user_role";

// Cookie options for secure storage
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const authCookies = {
  /**
   * Set authentication tokens in httpOnly cookies (server-side only)
   */
  setTokens: async (
    accessToken: string,
    refreshToken: string,
    sessionId: string,
    role?: string,
  ) => {
    const cookieStore = await cookies();

    // Access token - expires in 15 minutes
    cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 15, // 15 minutes
    });

    // Refresh token - expires in 7 days
    cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Session ID - expires in 7 days
    cookieStore.set(SESSION_ID_KEY, sessionId, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // User role - expires in 7 days
    if (role) {
      cookieStore.set(USER_ROLE_KEY, role, {
        ...COOKIE_OPTIONS,
        httpOnly: false, // Allow client-side access for role-based UI
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  },

  /**
   * Update access token only (server-side only)
   */
  setAccessToken: async (accessToken: string) => {
    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 15, // 15 minutes
    });
  },

  /**
   * Get the access token (server-side only)
   */
  getAccessToken: async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  },

  /**
   * Get the refresh token (server-side only)
   */
  getRefreshToken: async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(REFRESH_TOKEN_KEY)?.value;
  },

  /**
   * Get the session ID (server-side only)
   */
  getSessionId: async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_ID_KEY)?.value;
  },

  /**
   * Get the user role
   */
  getUserRole: async (): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(USER_ROLE_KEY)?.value;
  },

  /**
   * Clear all authentication cookies (logout)
   */
  clearTokens: async () => {
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN_KEY);
    cookieStore.delete(REFRESH_TOKEN_KEY);
    cookieStore.delete(SESSION_ID_KEY);
    cookieStore.delete(USER_ROLE_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    const token = await authCookies.getAccessToken();
    return !!token;
  },
};
