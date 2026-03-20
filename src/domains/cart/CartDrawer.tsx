import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCartStore } from './cart.store'
import { CartItem } from './CartItem'
import { CartSummary } from './CartSummary'

type Props = {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: Props) {
  const { t } = useTranslation()
  const { items } = useCartStore()

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">{t('cart.title')}</h2>
          <button onClick={onClose} aria-label="close" className="text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0
            ? <p className="text-gray-500 text-sm text-center mt-8">{t('cart.empty')}</p>
            : items.map((item) => <CartItem key={item.product.id} item={item} />)
          }
        </div>
        <div className="p-4">
          <CartSummary />
        </div>
      </aside>
    </>
  )
}
