import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from './cart.store'
import { Button } from '@/components/ui/Button'

export function CartSummary() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { total, items } = useCartStore()

  if (items.length === 0) return null

  return (
    <div className="border-t border-gray-200 pt-4 flex flex-col gap-3">
      <div className="flex justify-between text-sm font-medium">
        <span>{t('cart.total')}</span>
        <span className="text-blue-600 text-base font-bold">{total().toFixed(2)} €</span>
      </div>
      <Button onClick={() => void navigate('/checkout')} className="w-full">
        {t('cart.checkout')}
      </Button>
    </div>
  )
}
