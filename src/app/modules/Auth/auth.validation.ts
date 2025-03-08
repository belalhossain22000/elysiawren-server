import { z } from "zod";

const changePasswordValidationSchema = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export const loginValidationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password should be at least 6 characters"),
});

export const authValidation = {
  changePasswordValidationSchema,
};
