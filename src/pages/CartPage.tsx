import { useTranslation } from 'react-i18next'
import { useCartStore } from '@/domains/cart/cart.store'
import { CartItem } from '@/domains/cart/CartItem'
import { CartSummary } from '@/domains/cart/CartSummary'

export function CartPage() {
  const { t } = useTranslation()
  const { items } = useCartStore()

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t('cart.title')}</h1>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t('cart.empty')}</p>
      ) : (
        <>
          <ul className="flex flex-col">
            {items.map((item) => <CartItem key={item.product.id} item={item} />)}
          </ul>
          <CartSummary />
        </>
      )}
    </div>
  )
}
