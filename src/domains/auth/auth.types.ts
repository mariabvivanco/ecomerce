import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

export type LoginPayload = z.infer<typeof LoginSchema>
export type RegisterPayload = z.infer<typeof RegisterSchema>

export type AuthUser = {
  id: string
  email: string
  firstName: string
  lastName: string
}

export type AuthResponse = {
  user: AuthUser
}
