import { PayPalButtons } from '@paypal/react-paypal-js'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { captureOrder } from './checkout.service'
import { Button } from '@/components/ui/Button'

type Props = {
  paypalOrderId: string
  internalOrderId: string
  onSuccess: (orderId: string) => void
}

export function PayPalButton({ paypalOrderId, internalOrderId, onSuccess }: Props) {
  const { t } = useTranslation()
  const isMock = paypalOrderId.startsWith('MOCK_PAYPAL_')

  async function handleCapture() {
    try {
      await captureOrder(internalOrderId)
      onSuccess(internalOrderId)
    } catch {
      toast.error(t('common.error'))
    }
  }

  if (isMock) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-xs text-amber-600 text-center">Modo desarrollo — pago simulado</p>
        <Button onClick={handleCapture} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
          Simular pago PayPal
        </Button>
      </div>
    )
  }

  return (
    <PayPalButtons
      style={{ layout: 'vertical', shape: 'rect' }}
      createOrder={() => Promise.resolve(paypalOrderId)}
      onApprove={handleCapture}
      onError={() => toast.error(t('common.error'))}
    />
  )
}
