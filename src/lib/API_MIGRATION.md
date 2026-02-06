# API Response Structure Migration

All API calls in the SyncNexa Identity App now follow a standardized response structure.

## Standard Response Format

Every API endpoint returns data in this format:

```typescript
{
  status: string,      // "success", "error", "pending", etc.
  message: string,     // Human-readable message
  data: T              // The actual response payload
}
```

## Updated Files

### 1. Types ([types/api.d.ts](../types/api.d.ts))

- `APIResponse<T>` - Generic response interface
- `SignupResponse`, `LoginResponse`, `OTPRequestResponse`, `OTPVerifyResponse` - Typed responses
- Includes documentation and usage examples

### 2. Hooks

#### useFetch ([hooks/useFetch.ts](../hooks/useFetch.ts))

Returns:

```typescript
{
  data: T | null,          // Extracted from APIResponse.data
  loading: boolean,
  error: Error | null,
  status: string | null,   // From APIResponse.status
  message: string | null,  // From APIResponse.message
  refetch: () => Promise<void>
}
```

#### usePost ([hooks/usePost.ts](../hooks/usePost.ts))

Returns:

```typescript
{
  data: TRes | null,       // Extracted from APIResponse.data
  loading: boolean,
  error: Error | null,
  status: string | null,   // From APIResponse.status
  message: string | null,  // From APIResponse.message
  post: (body?, opts?) => Promise<TRes | null>,
  reset: () => void,
  abort: () => void,
  setData: (d) => void
}
```

### 3. Utilities

#### API Helpers ([lib/apiHelpers.ts](../lib/apiHelpers.ts))

- `isAPIResponse<T>()` - Type guard
- `extractAPIData<T>()` - Extract data from response
- `isSuccessResponse()` - Check if response is successful
- `isErrorResponse()` - Check if response is an error
- `successResponse()` - Create success response
- `errorResponse()` - Create error response

### 4. Configuration

#### Environment Variable ([.env.local](../../.env.local))

```
API_BASE_URL=https://syncnexa-identity-system-staging-702379713666.africa-south1.run.app
```

#### API Proxy ([lib/apiProxy.ts](../lib/apiProxy.ts))

Updated to use `API_BASE_URL` (server-side only, not exposed to client)

## Usage Examples

### Example 1: Login

```typescript
const { post, loading, data, status, message } = usePost<LoginData>("login");

const handleLogin = async () => {
  const result = await post({ email, password });

  if (result) {
    // result is LoginData, already unwrapped
    console.log("Token:", result.token);
    console.log("User:", result.user);
  }

  // Or check status
  if (status === "success" && data) {
    // Success!
  } else if (status === "error") {
    console.error(message);
  }
};
```

### Example 2: Fetch Data

```typescript
const { data, loading, error, status, message } = useFetch<UserProfile>("/api/user");

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
if (status !== "success" || !data) return <div>No data</div>;

return <div>Welcome, {data.firstName}!</div>;
```

### Example 3: With Helpers

```typescript
import { isSuccessResponse, isErrorResponse } from "@/lib/apiHelpers";

const { post, data, status, message } = usePost<SignupData>("signup");

const handleSubmit = async () => {
  await post(formData);

  if (status && data && message !== null) {
    const response: APIResponse<SignupData> = { status, data, message };

    if (isSuccessResponse(response)) {
      console.log("Success:", response.data);
    } else if (isErrorResponse(response)) {
      console.log("Error:", response.message);
    }
  }
};
```

## Migration Checklist

When updating existing API calls:

1. ✅ Update hook destructuring to include `status` and `message`
2. ✅ Access data directly (it's already unwrapped from `APIResponse.data`)
3. ✅ Check `status` for success/error states
4. ✅ Display `message` to users for feedback
5. ✅ Handle `null` states properly

## Backend Requirements

Your backend API must return responses in this format:

```typescript
// Success response
{
  "status": "success",
  "message": "User logged in successfully",
  "data": {
    "token": "jwt-token-here",
    "user": { ... }
  }
}

// Error response
{
  "status": "error",
  "message": "Invalid credentials",
  "data": null
}
```

## TypeScript Support

All hooks and helpers are fully typed. TypeScript will:

- Infer the correct data type from generic parameters
- Provide autocomplete for `status` and `message` properties
- Warn about null checks where needed

## Additional Resources

- See [apiUsageExamples.tsx](./apiUsageExamples.tsx) for comprehensive examples
- Check [apiHelpers.ts](./apiHelpers.ts) for utility functions
- Review [api.d.ts](../types/api.d.ts) for all type definitions
