import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/domains/cart/cart.store'
import { useCustomer } from '@/domains/customer/customer.queries'
import { useAuthStore } from '@/domains/auth/auth.store'
import { createOrder } from './checkout.service'
import { CheckoutSchema, type CheckoutData, type CreateOrderResponse } from './checkout.types'

export function useCheckout() {
  const navigate = useNavigate()
  const { items, clear } = useCartStore()
  const { isAuthenticated } = useAuthStore()
  const { data: profile, isLoading: isLoadingProfile } = useCustomer()
  const [pendingOrder, setPendingOrder] = useState<CreateOrderResponse | null>(null)

  const form = useForm<CheckoutData>({ resolver: zodResolver(CheckoutSchema) })

  useEffect(() => {
    if (!profile) return
    form.reset({
      shipping: {
        firstName: profile.firstName ?? '',
        lastName: profile.lastName ?? '',
        address: profile.billingAddress?.address ?? '',
        city: profile.billingAddress?.city ?? '',
        postalCode: profile.billingAddress?.postalCode ?? '',
        country: profile.billingAddress?.country ?? 'ES',
      },
      billing: {
        firstName: profile.billingAddress?.firstName ?? profile.firstName ?? '',
        lastName: profile.billingAddress?.lastName ?? profile.lastName ?? '',
        nif: profile.billingAddress?.nif ?? '',
        email: profile.email ?? '',
        address: profile.billingAddress?.address ?? '',
        city: profile.billingAddress?.city ?? '',
        postalCode: profile.billingAddress?.postalCode ?? '',
        country: profile.billingAddress?.country ?? 'ES',
      },
    })
  }, [profile?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  async function submitOrder(data: CheckoutData) {
    const order = await createOrder(items, data)
    setPendingOrder(order)
  }

  function handlePaymentSuccess(orderId: string) {
    clear()
    void navigate(`/order-confirmation/${orderId}`)
  }

  return {
    items, pendingOrder, submitOrder, handlePaymentSuccess, form,
    isLoadingProfile: isAuthenticated && isLoadingProfile,
  }
}
