
import { z } from 'zod';

// Password validation schema with security requirements
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Email validation schema
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required')
  .max(254, 'Email is too long');

// Profile validation schema
export const profileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long')
    .regex(/^[a-zA-Z\s'-]+$/, 'Full name contains invalid characters'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+233\d{9}$/.test(val), {
      message: 'Phone number must be in format +233XXXXXXXXX'
    }),
  age: z
    .number()
    .min(13, 'Age must be at least 13')
    .max(100, 'Age must be less than 100')
    .optional(),
  location: z
    .string()
    .max(100, 'Location is too long')
    .optional(),
  emergency_contact_name: z
    .string()
    .max(100, 'Emergency contact name is too long')
    .regex(/^[a-zA-Z\s'-]*$/, 'Name contains invalid characters')
    .optional(),
  emergency_contact_phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+233\d{9}$/.test(val), {
      message: 'Emergency contact phone must be in format +233XXXXXXXXX'
    }),
  medical_conditions: z
    .string()
    .max(1000, 'Medical conditions description is too long')
    .optional()
});

// Auth validation schemas
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
});

// Text sanitization function
export const sanitizeText = (text: string): string => {
  return text
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 1000); // Limit length
};

// HTML sanitization for rich text
export const sanitizeHtml = (html: string): string => {
  // Basic HTML sanitization - remove dangerous tags and attributes
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
};
