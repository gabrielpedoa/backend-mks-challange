import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const userSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export class UpdateUserDto extends createZodDto(userSchema) {}
