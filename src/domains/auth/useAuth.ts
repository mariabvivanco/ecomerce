import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from './auth.store'
import { useCartStore } from '@/domains/cart/cart.store'
import { queryClient } from '@/lib/queryClient'
import * as authService from './auth.service'
import type { LoginPayload, RegisterPayload } from './auth.types'

export function useAuth() {
  const { setUser, clearUser, user, isAuthenticated } = useAuthStore()
  const clearCart = useCartStore((s) => s.clear)
  const navigate = useNavigate()
  const { t } = useTranslation()

  async function handleLogin(payload: LoginPayload, redirectTo = '/') {
    const { user: authUser } = await authService.login(payload)
    queryClient.clear()
    setUser(authUser)
    void navigate(redirectTo)
  }

  async function handleRegister(payload: RegisterPayload, redirectTo = '/') {
    const { user: authUser } = await authService.register(payload)
    queryClient.clear()
    setUser(authUser)
    void navigate(redirectTo)
  }

  async function handleLogout() {
    await authService.logout()
    void navigate('/')
    queryClient.clear()
    clearCart()
    clearUser()
    toast.success(t('nav.logout'))
  }

  return { user, isAuthenticated, handleLogin, handleRegister, handleLogout }
}
