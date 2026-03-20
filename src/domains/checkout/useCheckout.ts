import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/domains/cart/cart.store'
import { createOrder } from './checkout.service'
import type { CheckoutData, CreateOrderResponse } from './checkout.types'

export function useCheckout() {
  const navigate = useNavigate()
  const { items, clear } = useCartStore()
  const [pendingOrder, setPendingOrder] = useState<CreateOrderResponse | null>(null)

  async function submitOrder(data: CheckoutData) {
    const order = await createOrder(items, data)
    setPendingOrder(order)
  }

  function handlePaymentSuccess(orderId: string) {
    clear()
    void navigate(`/order-confirmation/${orderId}`)
  }

  return { items, pendingOrder, submitOrder, handlePaymentSuccess }
}
