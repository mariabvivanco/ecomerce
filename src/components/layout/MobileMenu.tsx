import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/domains/auth/auth.store'
import { useAuth } from '@/domains/auth/useAuth'
import { LanguageSelector } from './LanguageSelector'

type Props = { onClose: () => void }

function navClass({ isActive }: { isActive: boolean }) {
  return `transition-colors ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`
}

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
      <NavLink to="/products" end onClick={onClose} className={navClass}>
        {t('nav.products')}
      </NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/orders" end onClick={onClose} className={navClass}>
            {t('nav.orders')}
          </NavLink>
          <NavLink to="/profile" end onClick={onClose} className={navClass}>
            {t('nav.profile')}
          </NavLink>
          <button onClick={logout} className="text-gray-600 hover:text-gray-900 transition-colors">
            {t('nav.logout')}
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" end onClick={onClose} className={navClass}>
            {t('nav.login')}
          </NavLink>
          <NavLink to="/register" end onClick={onClose} className={({ isActive }) =>
            `font-medium border rounded-lg px-3 py-1 transition-colors ${isActive ? 'border-blue-800 text-blue-800' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`
          }>
            {t('nav.register')}
          </NavLink>
        </>
      )}
      <LanguageSelector />
    </nav>
  )
}
