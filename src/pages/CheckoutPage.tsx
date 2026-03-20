import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { CheckoutSchema, type CheckoutData } from '@/domains/checkout/checkout.types'
import { useCheckout } from '@/domains/checkout/useCheckout'
import { ShippingForm } from '@/domains/checkout/ShippingForm'
import { BillingForm } from '@/domains/checkout/BillingForm'
import { PayPalButton } from '@/domains/checkout/PayPalButton'
import { Button } from '@/components/ui/Button'

export function CheckoutPage() {
  const { t } = useTranslation()
  const { items, pendingOrder, submitOrder, handlePaymentSuccess } = useCheckout()
  const form = useForm<CheckoutData>({ resolver: zodResolver(CheckoutSchema) })

  async function onSubmit(data: CheckoutData) {
    try {
      await submitOrder(data)
    } catch {
      toast.error(t('common.error'))
    }
  }

  if (items.length === 0) {
    return <main className="p-8 text-center text-gray-500">{t('cart.empty')}</main>
  }

  return (
    <main className="max-w-2xl mx-auto p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">{t('checkout.title')}</h1>
      {!pendingOrder ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <ShippingForm form={form} />
          <BillingForm form={form} />
          <Button type="submit" loading={form.formState.isSubmitting}>
            {t('common.next')}
          </Button>
        </form>
      ) : (
        <PayPalButton
          paypalOrderId={pendingOrder.paypalOrderId}
          internalOrderId={pendingOrder.order.id}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </main>
  )
}
