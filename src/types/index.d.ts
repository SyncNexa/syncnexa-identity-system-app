interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  state?: string;
  address?: string;
}

type ThemeName = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeName;
  toggleTheme: () => void;
}
