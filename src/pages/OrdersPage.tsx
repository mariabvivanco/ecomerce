import { useTranslation } from 'react-i18next'
import { useOrders } from '@/domains/orders/order.queries'
import { OrderList } from '@/domains/orders/OrderList'
import { Spinner } from '@/components/ui/Spinner'

export function OrdersPage() {
  const { t } = useTranslation()
  const { data, isLoading } = useOrders()

  if (isLoading) return <Spinner />

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t('orders.title')}</h1>
      <OrderList orders={data?.items ?? []} />
    </div>
  )
}
