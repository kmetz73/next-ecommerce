import { z } from 'zod';
import {
  insertingProductSchema,
  insertCartSchema,
  cartItemSchema,
} from '@/lib/validators';

export type Product = z.infer<typeof insertingProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
