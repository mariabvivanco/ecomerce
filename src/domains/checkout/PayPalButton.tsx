import { PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { captureOrder } from './checkout.service'

type Props = {
  paypalOrderId: string
  internalOrderId: string
  onSuccess: (orderId: string) => void
}

export function PayPalButton({ paypalOrderId, internalOrderId, onSuccess }: Props) {
  const { t } = useTranslation()

  return (
    <PayPalButtons
      style={{ layout: 'vertical', shape: 'rect' }}
      createOrder={() => Promise.resolve(paypalOrderId)}
      onApprove={async () => {
        try {
          await captureOrder(internalOrderId)
          onSuccess(internalOrderId)
        } catch {
          toast.error(t('common.error'))
        }
      }}
      onError={() => toast.error(t('common.error'))}
    />
  )
}
