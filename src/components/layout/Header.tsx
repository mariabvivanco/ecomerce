import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '@/domains/cart/cart.store'
import { CartDrawer } from '@/domains/cart/CartDrawer'
import { DesktopNav } from './DesktopNav'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { t } = useTranslation()
  const totalItems = useCartStore((s) => s.totalItems())
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="text-lg font-bold text-blue-600">{t('nav.brand')}</Link>

        <DesktopNav />

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-gray-600 hover:text-gray-900"
            aria-label={t('nav.cart')}
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-gray-600 hover:text-gray-900"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
