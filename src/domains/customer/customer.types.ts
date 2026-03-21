import { z } from 'zod'

export const ProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

export const BillingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nif: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().optional(),
})

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  billing: BillingSchema.optional(),
})

export type ProfileData = z.infer<typeof ProfileSchema>
export type BillingData = z.infer<typeof BillingSchema>
export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>

export type BillingAddress = {
  id: string
  firstName: string
  lastName: string
  nif: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string | null
}

export type CustomerProfile = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  createdAt: string
  billingAddress: BillingAddress | null
}
