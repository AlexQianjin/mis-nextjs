import { z } from 'zod';
import { SampleStatus } from '@prisma/client';

export const SampleSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: 'Must be 3 or more characters long' })
    .max(64, { message: 'Must be less then 64 characters' }),
  description: z.string().optional(),
  status: z.nativeEnum(SampleStatus)
});

export type Sample = z.infer<typeof SampleSchema>;
