import { z } from "zod";

export const importInterrogationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .regex(
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/,
      "Format must be MM/DD/YYYY"
    ),
  documentType: z.enum(["clinic", "remote"]),
});

export type ImportInterrogationFormData = z.infer<
  typeof importInterrogationSchema
>;

export const userProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  institutionalRole: z.string().min(1, "Please select an institutional role"),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;

export const userChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_-])[A-Za-z\d@$!%*?&#^()_-]/,
        "Must contain uppercase, lowercase, number & special character"
      ),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });

export type UserChangePasswordFormData = z.infer<
  typeof userChangePasswordSchema
>;


