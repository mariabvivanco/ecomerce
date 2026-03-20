import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useOrder } from '@/domains/orders/order.queries'
import { OrderDetail } from '@/domains/orders/OrderDetail'
import { Spinner } from '@/components/ui/Spinner'

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { data: order, isLoading } = useOrder(id ?? '')

  if (isLoading) return <Spinner />
  if (!order) return <p className="text-center py-8 text-gray-500">{t('orders.notFound')}</p>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t('orders.detail')}</h1>
      <OrderDetail order={order} />
    </div>
  )
}
