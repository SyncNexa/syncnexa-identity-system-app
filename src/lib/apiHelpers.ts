/**
 * Type-safe API client utilities
 * These helpers ensure type safety when working with APIResponse structure
 */

/**
 * Type guard to check if a response is an APIResponse
 */
export function isAPIResponse<T>(response: any): response is APIResponse<T> {
  return (
    response &&
    typeof response === "object" &&
    "status" in response &&
    "message" in response &&
    "data" in response
  );
}

/**
 * Extract data from APIResponse or return the raw response if not in APIResponse format
 */
export function extractAPIData<T>(response: any): T | null {
  if (isAPIResponse<T>(response)) {
    return response.data;
  }
  return response as T;
}

/**
 * Check if API response indicates success
 */
export function isSuccessResponse<T>(
  response: APIResponse<T> | null,
): response is APIResponse<T> {
  return (
    response !== null &&
    isAPIResponse(response) &&
    (response.status === "success" || response.status === "ok")
  );
}

/**
 * Check if API response indicates an error
 */
export function isErrorResponse<T>(response: APIResponse<T> | null): boolean {
  return (
    response !== null &&
    isAPIResponse(response) &&
    (response.status === "error" || response.status === "fail")
  );
}

/**
 * Create a standardized APIResponse
 */
export function createAPIResponse<T>(
  status: string,
  message: string,
  data: T,
): APIResponse<T> {
  return { status, message, data };
}

/**
 * Create a success response
 */
export function successResponse<T>(
  data: T,
  message = "Success",
): APIResponse<T> {
  return createAPIResponse("success", message, data);
}

/**
 * Create an error response
 */
export function errorResponse<T = null>(
  message: string,
  data: T | null = null,
): APIResponse<T | null> {
  return createAPIResponse("error", message, data);
}
