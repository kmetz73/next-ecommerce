import { z } from 'zod';
import { insertingProductSchema } from '@/lib/validators';

export type Product = z.infer<typeof insertingProductSchema> & {
  id: string;
  rating: string;
  createdAT: Date;
};
