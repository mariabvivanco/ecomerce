import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { getOrders, getOrder } from './order.service'
import type { Order } from './order.types'

const BASE = 'http://localhost:4000/api'

const mockOrder: Order = {
  id: 'order-1',
  email: 'user@test.com',
  status: 'PAID',
  total: 29.99,
  createdAt: '2024-01-01T00:00:00.000Z',
  items: [
    {
      id: 'item-1',
      quantity: 2,
      unitPrice: 14.995,
      product: { id: 'prod-1', name: 'Ibuprofeno', imageUrl: null },
    },
  ],
  shipping: null,
}

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('order service', () => {
  it('getOrders returns list of orders', async () => {
    server.use(
      http.get(`${BASE}/orders`, () => HttpResponse.json({ items: [mockOrder] })),
    )
    const res = await getOrders()
    expect(res.items).toHaveLength(1)
    expect(res.items[0].id).toBe('order-1')
  })

  it('getOrder returns a single order by id', async () => {
    server.use(
      http.get(`${BASE}/orders/order-1`, () => HttpResponse.json(mockOrder)),
    )
    const res = await getOrder('order-1')
    expect(res.id).toBe('order-1')
    expect(res.status).toBe('PAID')
  })

  it('getOrders returns empty list when no orders', async () => {
    server.use(
      http.get(`${BASE}/orders`, () => HttpResponse.json({ items: [] })),
    )
    const res = await getOrders()
    expect(res.items).toHaveLength(0)
  })

  it('getOrder rejects on 404', async () => {
    server.use(
      http.get(`${BASE}/orders/unknown`, () =>
        HttpResponse.json({ error: 'Not found' }, { status: 404 }),
      ),
    )
    await expect(getOrder('unknown')).rejects.toThrow()
  })
})
