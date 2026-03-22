import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/domains/auth/auth.store'
import { Spinner } from '@/components/ui/Spinner'

export function PrivateRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const hasHydrated = useAuthStore((s) => s._hasHydrated)
  const location = useLocation()

  if (!hasHydrated) return <Spinner />

  const from = location.pathname === '/checkout' ? { from: location.pathname } : undefined

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" state={from} replace />
}
