import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle } from 'lucide-react'

export function OrderConfirmationPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-md mx-auto px-4 py-16 flex flex-col items-center gap-6 text-center">
      <CheckCircle className="w-16 h-16 text-green-500" />
      <h1 className="text-2xl font-bold">{t('orders.confirmation.title')}</h1>
      <p className="text-gray-500">{t('orders.confirmation.message')}</p>
      <div className="flex flex-col gap-3 w-full">
        <Link
          to="/orders"
          className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-medium text-center hover:bg-blue-700 transition-colors"
        >
          {t('orders.confirmation.viewOrders')}
        </Link>
        <Link
          to="/products"
          className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium text-center hover:bg-gray-50 transition-colors"
        >
          {t('orders.confirmation.continueShopping')}
        </Link>
      </div>
    </div>
  )
}
