import { z } from "zod";

// ==================== SIGNUP SCHEMA ====================

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters long.")
      .max(50, "Name cannot exceed 50 characters.")
      .regex(
        /^[\p{L}][\p{L}\p{M} '-]*$/u,
        "Name can contain letters, spaces, apostrophes, and hyphens only."
      ),

    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .max(254, "Email cannot exceed 254 characters.")
      .email("Please enter a valid email address."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .max(128, "Password cannot exceed 128 characters.")
      .regex(/[a-z]/, "Password must contain a lowercase letter.")
      .regex(/[A-Z]/, "Password must contain an uppercase letter.")
      .regex(/[0-9]/, "Password must contain a number.")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain a special character."
      )
      .refine(
        (value) => !/\s/.test(value),
        "Password cannot contain spaces."
      ),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password."),

    agreeTerms: z
      .boolean()
      .refine(
        (value) => value === true,
        "Please accept the Terms of Service and Privacy Policy."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });


// ==================== LOGIN SCHEMA ====================

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .max(254, "Email cannot exceed 254 characters.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Password is required.")
    .max(128, "Password cannot exceed 128 characters."),
});
