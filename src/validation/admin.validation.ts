import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  deviceClinic: z.string().min(1, "Please select a device clinic"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_-])[A-Za-z\d@$!%*?&#^()_-]/,
      "Must contain uppercase, lowercase, number & special character"
    ),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export const editUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  deviceClinic: z.string().min(1, "Please select a device clinic"),
  password: z.string().optional().or(z.literal("")),
});

export type EditUserFormData = z.infer<typeof editUserSchema>;

export const createClinicSchema = z.object({
  name: z.string().min(1, "Device clinic name is required"),
  administrator: z.string().min(1, "Please select an administrator"),
});

export type CreateClinicFormData = z.infer<typeof createClinicSchema>;

export const adminProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export type AdminProfileFormData = z.infer<typeof adminProfileSchema>;

export const adminChangePasswordSchema = z
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

export type AdminChangePasswordFormData = z.infer<
  typeof adminChangePasswordSchema
>;

