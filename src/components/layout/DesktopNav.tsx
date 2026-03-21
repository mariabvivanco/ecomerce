import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { User } from 'lucide-react'
import { useAuthStore } from '@/domains/auth/auth.store'
import { useAuth } from '@/domains/auth/useAuth'
import { LanguageSelector } from './LanguageSelector'

function navClass({ isActive }: { isActive: boolean }) {
  return `text-sm transition-colors ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`
}

export function DesktopNav() {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuthStore()
  const { handleLogout } = useAuth()

  return (
    <nav className="hidden md:flex items-center gap-5">
      <NavLink to="/products" end className={navClass}>
        {t('nav.products')}
      </NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/orders" end className={navClass}>
            {t('nav.orders')}
          </NavLink>
          <NavLink to="/profile" end className={({ isActive }) =>
            `transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`
          }>
            <User size={20} />
          </NavLink>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            {t('nav.logout')}
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" end className={navClass}>
            {t('nav.login')}
          </NavLink>
          <NavLink to="/register" end className={({ isActive }) =>
            `text-sm font-medium border rounded-lg px-3 py-1 transition-colors ${isActive ? 'border-blue-800 text-blue-800' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}`
          }>
            {t('nav.register')}
          </NavLink>
        </>
      )}
      <LanguageSelector />
    </nav>
  )
}
