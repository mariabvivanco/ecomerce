import { api } from '@/lib/axios'
import type { CustomerProfile, UpdateProfileData } from './customer.types'

export async function getProfile(): Promise<CustomerProfile> {
  const res = await api.get<CustomerProfile>('/customers/me')
  return res.data
}

export async function updateProfile(data: UpdateProfileData): Promise<CustomerProfile> {
  const res = await api.put<CustomerProfile>('/customers/me', data)
  return res.data
}
