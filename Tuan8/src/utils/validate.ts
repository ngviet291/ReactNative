export const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? "" : "Invalid email";

export const validatePassword = (password: string) =>
  password.length >= 6 ? "" : "Password must be at least 6 characters";