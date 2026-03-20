import { api } from '@/lib/axios'
import type { Order } from './order.types'

export async function getOrders(): Promise<{ items: Order[] }> {
  const res = await api.get<{ items: Order[] }>('/orders')
  return res.data
}

export async function getOrder(id: string): Promise<Order> {
  const res = await api.get<Order>(`/orders/${id}`)
  return res.data
}
