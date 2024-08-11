import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(64, { message: 'Must be less then 64 characters' }),
  email: z.string().email({ message: 'Must be the email format' }),
  password: z
    .string()
    .min(8, { message: 'Must be 8 or more characters long' })
    .max(64, { message: 'Must be less then 64 characters' })
});

export type User = z.infer<typeof UserSchema>;
