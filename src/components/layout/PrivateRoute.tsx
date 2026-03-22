import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/domains/auth/auth.store'

export function PrivateRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()
  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location.pathname }} replace />
}
