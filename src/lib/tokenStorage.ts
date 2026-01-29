/**
 * Secure token storage utilities
 * Stores access and refresh tokens in localStorage with proper error handling
 */

const ACCESS_TOKEN_KEY = "syncnexa_access_token";
const REFRESH_TOKEN_KEY = "syncnexa_refresh_token";
const USER_ROLE_KEY = "syncnexa_user_role";

export const tokenStorage = {
  /**
   * Save authentication tokens to localStorage
   */
  setTokens: (accessToken: string, refreshToken: string, role?: string) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      if (role) {
        localStorage.setItem(USER_ROLE_KEY, role);
      }
    } catch (error) {
      console.error("Failed to save tokens:", error);
    }
  },

  /**
   * Get the access token
   */
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;

    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to get access token:", error);
      return null;
    }
  },

  /**
   * Get the refresh token
   */
  getRefreshToken: (): string | null => {
    if (typeof window === "undefined") return null;

    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error("Failed to get refresh token:", error);
      return null;
    }
  },

  /**
   * Get the user role
   */
  getUserRole: (): string | null => {
    if (typeof window === "undefined") return null;

    try {
      return localStorage.getItem(USER_ROLE_KEY);
    } catch (error) {
      console.error("Failed to get user role:", error);
      return null;
    }
  },

  /**
   * Clear all stored tokens (logout)
   */
  clearTokens: () => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_ROLE_KEY);
    } catch (error) {
      console.error("Failed to clear tokens:", error);
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!tokenStorage.getAccessToken();
  },
};
