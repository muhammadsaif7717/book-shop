import { z } from 'zod';

export const productSchemaZodValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.enum([
    'Fiction',
    'Science',
    'SelfDevelopment',
    'Poetry',
    'Religious',
  ]),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  quantity: z.number().nonnegative('Quantity cannot be negative'),
  inStock: z.boolean(),
});
