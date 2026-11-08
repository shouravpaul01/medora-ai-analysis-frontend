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

