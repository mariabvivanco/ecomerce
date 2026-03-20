import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { User } from 'lucide-react'
import { useAuthStore } from '@/domains/auth/auth.store'
import { useAuth } from '@/domains/auth/useAuth'
import { LanguageSelector } from './LanguageSelector'

export function DesktopNav() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()
  const { handleLogout } = useAuth()

  return (
    <nav className="hidden md:flex items-center gap-5">
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
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900">
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
    </nav>
  )
}
