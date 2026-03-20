import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { CartItem as CartItemType } from './cart.store'
import { useCartStore } from './cart.store'

type Props = { item: CartItemType }

export function CartItem({ item }: Props) {
  const { t } = useTranslation()
  const { removeItem, updateQuantity } = useCartStore()

  return (
    <div className="flex gap-3 py-3 border-b border-gray-100">
      <img
        src={item.product.imageUrl ?? '/placeholder.svg'}
        alt={item.product.name}
        className="w-16 h-16 object-contain bg-white rounded-lg border border-gray-100 shrink-0"
      />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
        <p className="text-sm text-blue-600 font-semibold">{item.product.price.toFixed(2)} €</p>
        <div className="flex items-center gap-2 mt-1">
          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="w-6 h-6 rounded border border-gray-300 text-sm flex items-center justify-center hover:bg-gray-100">−</button>
          <span className="text-sm w-6 text-center">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="w-6 h-6 rounded border border-gray-300 text-sm flex items-center justify-center hover:bg-gray-100">+</button>
        </div>
      </div>
      <button onClick={() => removeItem(item.product.id)}
        aria-label={t('cart.remove')}
        className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
        <Trash2 size={16} />
      </button>
    </div>
  )
}
