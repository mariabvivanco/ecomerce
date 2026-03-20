import { useTranslation } from 'react-i18next'
import type { Order } from './order.types'

type Props = { order: Order }

export function OrderDetail({ order }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">#{order.id.slice(0, 8)}</p>
          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString('es-ES')}</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          {t(`orders.status.${order.status}`)}
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {order.items.map((item) => (
          <li key={item.id} className="flex gap-3 items-center">
            <img src={item.product.imageUrl ?? '/placeholder.svg'} alt={item.product.name}
              className="w-14 h-14 object-contain bg-white rounded-lg border border-gray-100" />
            <div className="flex-1">
              <p className="text-sm font-medium">{item.product.name}</p>
              <p className="text-xs text-gray-500">{t('cart.quantity')}: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold">{(item.unitPrice * item.quantity).toFixed(2)} €</p>
          </li>
        ))}
      </ul>

      <div className="border-t pt-4 flex justify-between font-semibold">
        <span>{t('cart.total')}</span>
        <span className="text-blue-600">{order.total.toFixed(2)} €</span>
      </div>
    </div>
  )
}
