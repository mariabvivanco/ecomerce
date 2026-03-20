import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Order } from './order.types'

type Props = { orders: Order[] }

export function OrderList({ orders }: Props) {
  const { t } = useTranslation()

  if (orders.length === 0) {
    return <p className="text-gray-500 text-center py-8">{t('orders.empty')}</p>
  }

  return (
    <ul className="flex flex-col gap-3">
      {orders.map((order) => (
        <li key={order.id}>
          <Link
            to={`/orders/${order.id}`}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">#{order.id.slice(0, 8)}</p>
              <p className="text-sm">{new Date(order.createdAt).toLocaleDateString('es-ES')}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-semibold text-blue-600">{order.total.toFixed(2)} €</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {t(`orders.status.${order.status}`)}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
