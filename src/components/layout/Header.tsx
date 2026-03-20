import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShoppingCart, User } from 'lucide-react'
import { useAuthStore } from '@/domains/auth/auth.store'
import { useCartStore } from '@/domains/cart/cart.store'
import { useAuth } from '@/domains/auth/useAuth'
import { CartDrawer } from '@/domains/cart/CartDrawer'
import { LanguageSelector } from './LanguageSelector'

export function Header() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()
  const totalItems = useCartStore((s) => s.totalItems())
  const { handleLogout } = useAuth()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="text-lg font-bold text-blue-600">Farmacia</Link>

        <nav className="flex items-center gap-5">
          <Link to="/products" className="text-sm text-gray-600 hover:text-gray-900">
            {t('nav.products')}
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/orders" className="text-sm text-gray-600 hover:text-gray-900">
                {t('nav.orders')}
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                <User size={20} />
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                {t('nav.register')}
              </Link>
            </>
          )}

          <LanguageSelector />

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
        </nav>
      </div>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
