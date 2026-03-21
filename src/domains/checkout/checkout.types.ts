import { z } from 'zod'

export const ShippingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().optional(),
})

export const BillingSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nif: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  email: z.string().email(),
})

export const CheckoutSchema = z.object({
  shipping: ShippingSchema,
  billing: BillingSchema,
})

export type ShippingData = z.infer<typeof ShippingSchema>
export type BillingData = z.infer<typeof BillingSchema>
export type CheckoutData = z.infer<typeof CheckoutSchema>

export type CheckoutDefaultValues = {
  shipping: Partial<ShippingData>
  billing: Partial<BillingData>
}

export type CreateOrderResponse = {
  order: { id: string; status: string; total: number }
  paypalOrderId: string
}
