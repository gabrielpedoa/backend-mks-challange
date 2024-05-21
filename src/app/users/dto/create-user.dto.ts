import { createZodDto, patchNestJsSwagger } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const userSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format'),
  password: z.string({ required_error: 'Password is required' }).min(1),
});

export class CreateUserDto extends createZodDto(userSchema) {}
