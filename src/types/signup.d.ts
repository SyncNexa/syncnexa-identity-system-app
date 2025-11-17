interface Signup {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string; // may be national or E.164 depending on source
  password: string;
  confirmPassword?: string;
  state?: string;
  address?: string;
}

interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string; // normalized (digits, may include leading +)
  state?: string;
  address?: string;
}
