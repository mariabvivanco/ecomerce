import { api } from '@/lib/axios'
import type { CartItem } from '@/domains/cart/cart.store'
import type { CheckoutData, CreateOrderResponse } from './checkout.types'

export async function createOrder(
  cartItems: CartItem[],
  data: CheckoutData,
): Promise<CreateOrderResponse> {
  const res = await api.post<CreateOrderResponse>('/orders', {
    items: cartItems.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
    shipping: data.shipping,
    billing: data.billing,
  })
  return res.data
}

export async function captureOrder(orderId: string): Promise<{ id: string; status: string }> {
  const res = await api.post<{ id: string; status: string }>(`/orders/${orderId}/capture`)
  return res.data
}
