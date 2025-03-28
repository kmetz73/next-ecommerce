import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';
import { PAYMENT_METHODS } from './constants';

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must be a valid number with two decimal places'
  );

// Schema for inserting products into the database
export const insertingProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  slug: z.string().min(3, 'Slug must be at least 3 characters long'),
  category: z.string().min(3, 'Category must be at least 3 characters long'),
  brand: z.string().min(3, 'Brand must be at least 3 characters long'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

//  Schema for  signing  users in
export const signInFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6characters long'),
});

// schema  for  signing  up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// cart schemas
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product  is required'),
  name: z.string().min(1, ' Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  qty: z.number().int().nonnegative('Quantity must be a positive number'),
  image: z.string().min(1, 'Image is required'),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'Session cart ID is required'),
  userId: z.string().optional().nullable(),
});

//Schema for Shipping address
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters long'),
  streetAddress: z
    .string()
    .min(3, 'Address must be at least 3 characters long'),
  streetAddress2: z.string().optional(),
  city: z.string().min(3, 'City must be at least 3 characters long'),
  state: z.string().min(2, 'State must be at least 2 characters long'),
  postalCode: z.string().min(5, 'Zip code  must be at least 5 characters long'),
  country: z.string().min(2, 'Country must be at least 2 characters long'),
  lat: z.number().optional(),
  log: z.number().optional(),
});

// Schema for payment method
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, 'Payment method  is required'),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
  });

// Schema fo inserting order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: 'Invalid payment method',
  }),
  shippingAddress: shippingAddressSchema,
});

// schema for inserting orderId
export const insertOrderItemIdSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string().nullable(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

// Paypal  result schema
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});
