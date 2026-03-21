import axios from 'axios'
import { useAuthStore } from '@/domains/auth/auth.store'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const url = error.config?.url ?? ''
      const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register')
      if (!isAuthEndpoint) {
        useAuthStore.getState().clearUser()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)
