/**
 * Standard API Response Structure
 *
 * All API endpoints should return responses in this format:
 * {
 *   status: "success" | "error" | "pending",
 *   message: "Human-readable message",
 *   data: T // The actual response payload
 * }
 *
 * Example Usage:
 * ```typescript
 * // In a component
 * const { data, loading, error, status, message } = usePost<LoginData>('login');
 *
 * // After successful post
 * if (status === 'success' && data) {
 *   console.log(data.token); // Access the actual data
 * }
 * ```
 */

interface APIResponse<T> {
  status: string;
  message: string;
  data: T;
}

// Common API response types

interface LoginData {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface OTPRequestData {
  message: string;
  expiresIn?: number;
}

interface OTPVerifyData {
  verified: boolean;
  token?: string;
}

type PostOptions<TRes> = {
  headers?: Record<string, string>;
  optimisticData?: TRes | null; // set optimistic data immediately
  retry?: number; // number of retries on failure
  retryDelay?: number; // ms between retries
  rawResponse?: boolean; // if true, return Response instead of parsed json
};

type UsePostReturn<TRes, TReq> = {
  loading: boolean;
  data: TRes | null;
  error: Error | null;
  status: string | null;
  message: string | null;
  post: (body?: TReq, opts?: PostOptions<TRes>) => Promise<TRes | null>;
  reset: () => void;
  abort: () => void;
  setData: (d: TRes | null) => void;
};

type UseFetchReturn<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
  status: string | null;
  message: string | null;
  refetch: () => Promise<void>;
};

// Type aliases for common responses

type LoginResponse = APIResponse<LoginData>;
type OTPRequestResponse = APIResponse<OTPRequestData>;
type OTPVerifyResponse = APIResponse<OTPVerifyData>;
