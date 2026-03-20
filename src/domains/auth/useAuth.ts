import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from './auth.store'
import * as authService from './auth.service'
import type { LoginPayload, RegisterPayload } from './auth.types'

export function useAuth() {
  const { setUser, clearUser, user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const { t } = useTranslation()

  async function handleLogin(payload: LoginPayload) {
    const { user: authUser } = await authService.login(payload)
    setUser(authUser)
    void navigate('/')
  }

  async function handleRegister(payload: RegisterPayload) {
    const { user: authUser } = await authService.register(payload)
    setUser(authUser)
    void navigate('/')
  }

  async function handleLogout() {
    await authService.logout()
    clearUser()
    toast.success(t('nav.logout'))
    void navigate('/login')
  }

  return { user, isAuthenticated, handleLogin, handleRegister, handleLogout }
}
