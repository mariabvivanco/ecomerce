import { api } from '@/lib/axios'
import type { LoginPayload, RegisterPayload, AuthResponse } from './auth.types'

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/login', payload)
  return res.data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/register', payload)
  return res.data
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout')
}
