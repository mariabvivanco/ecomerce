import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/domains/auth/auth.store'
import { useAuth } from '@/domains/auth/useAuth'
import { LanguageSelector } from './LanguageSelector'

type Props = { onClose: () => void }

export function MobileMenu({ onClose }: Props) {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()
  const { handleLogout } = useAuth()

  function logout() {
    handleLogout()
    onClose()
  }

  return (
    <nav className="md:hidden border-t border-gray-200 bg-white px-4 py-4 flex flex-col items-center gap-4 text-sm">
      <Link to="/products" onClick={onClose} className="text-gray-600 hover:text-gray-900">
        {t('nav.products')}
      </Link>
      {isAuthenticated ? (
        <>
          <Link to="/orders" onClick={onClose} className="text-gray-600 hover:text-gray-900">
            {t('nav.orders')}
          </Link>
          <Link to="/profile" onClick={onClose} className="text-gray-600 hover:text-gray-900">
            {t('nav.profile')}
          </Link>
          <button onClick={logout} className="text-gray-600 hover:text-gray-900">
            {t('nav.logout')}
          </button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={onClose} className="text-gray-600 hover:text-gray-900">
            {t('nav.login')}
          </Link>
          <Link to="/register" onClick={onClose} className="font-medium text-blue-600 hover:text-blue-700">
            {t('nav.register')}
          </Link>
        </>
      )}
      <LanguageSelector />
    </nav>
  )
}
