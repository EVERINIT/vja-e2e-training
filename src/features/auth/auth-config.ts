import { API } from "@/shared/routes";

// All auth text/labels/messages/api paths. No bare text in components.
export const AUTH_CONFIG = {
  register: {
    heading: "Register",
    subtitle: "Create an account to start shopping.",
    nameLabel: "Name",
    emailLabel: "Email",
    passwordLabel: "Password",
    submit: "Register",
    submitting: "Registering...",
    api: API.authRegister,
  },
  login: {
    heading: "Login",
    subtitle: "Sign in to your account.",
    emailLabel: "Email",
    passwordLabel: "Password",
    submit: "Login",
    submitting: "Signing in...",
    api: API.authLogin,
  },
  logout: {
    label: "Logout",
    api: API.authLogout,
  },
  messages: {
    nameRequired: "Name is required",
    emailInvalid: "Enter a valid email",
    passwordTooShort: "Password must be at least 6 characters",
    passwordRequired: "Password is required",
    emailTaken: "Email is already registered",
    invalidCredentials: "Invalid email or password",
    genericError: "Something went wrong. Please try again.",
  },
} as const;
