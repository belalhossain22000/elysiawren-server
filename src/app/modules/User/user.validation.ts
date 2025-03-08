import { z } from "zod";


// User Validation Schema
export const userValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(100, "Last name is too long"),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone number should be at least 10 digits").max(15, "Phone number is too long"),
  bankId: z.string().max(50, "Bank ID should not exceed 50 characters"),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

// Business Validation Schema
export const businessValidationSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(255),
  email: z.string().email("Invalid email address").max(255),
  registrationNumber: z.string().min(1, "Registration number is required").max(50),
  phone: z.string().min(10, "Phone number should be at least 10 digits").max(15, "Phone number is too long"),
  taxId: z.string().min(1, "Tax ID is required").max(50),
  address: z.string().min(1, "Address is required").max(500),
  freightTypes: z.string().min(1, "Freight types are required").max(200),
  description: z.string().optional(),
});

// Wrapper schema for validating the full input
export const validateDataSchema = z.object({
  user: userValidationSchema,
  business: businessValidationSchema,
});

