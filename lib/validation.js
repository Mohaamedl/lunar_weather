import { z } from 'zod';

export const reportFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
    .transform(val => val.trim()),
    
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters')
    .transform(val => val.trim().toLowerCase()),
    
  reportType: z.enum(['bug', 'data', 'ui', 'suggestion', 'other'], {
    required_error: "Please select a report type"
  }),
  
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters')
    .transform(val => val.trim()),
  
  location: z.string().optional(),
  device: z.string().optional(),
  browser: z.string().optional(),
  
  acceptTerms: z.boolean()
    .refine(val => val === true, {
      message: "You must accept the terms and privacy policy"
    })
});

export const confirmationCodeSchema = z.object({
  code: z.string().length(6, 'Confirmation code must be 6 digits'),
});
