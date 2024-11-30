import { z } from 'zod';

export const createOrderSchema = z.object({
  email: z.string().email(),
  product: z.string().regex(/^[0-9a-fA-F]{24}$/), // MongoDB ObjectId format
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  totalPrice: z.number().positive('Total price must be a positive value'),
});
