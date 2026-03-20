import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { createOrder, captureOrder } from './checkout.service'
import type { CartItem } from '@/domains/cart/cart.store'
import type { Product } from '@/domains/products/product.types'

const BASE = 'http://localhost:4000/api'

const mockProduct = (id: string): Product => ({
  id, name: 'P', slug: id, description: '', price: 10, stock: 5,
  imageUrl: null, featured: false, requiresPrescription: false,
  category: { id: 'c1', name: 'Cat', slug: 'cat' },
})

const cartItems: CartItem[] = [{ product: mockProduct('p1'), quantity: 2 }]

const checkoutData = {
  shipping: { firstName: 'Ana', lastName: 'G', address: 'C/ 1', city: 'Madrid', postalCode: '28001', country: 'ES' },
  billing: { firstName: 'Ana', lastName: 'G', nif: '12345678A', address: 'C/ 1', city: 'Madrid', postalCode: '28001', country: 'ES', email: 'a@a.com' },
}

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('checkout service', () => {
  it('createOrder sends correct payload and returns order', async () => {
    let body: unknown
    server.use(
      http.post(`${BASE}/orders`, async ({ request }) => {
        body = await request.json()
        return HttpResponse.json({ order: { id: 'o1', status: 'PENDING', total: 20 }, paypalOrderId: 'PP-1' }, { status: 201 })
      }),
    )
    const res = await createOrder(cartItems, checkoutData)
    expect(res.paypalOrderId).toBe('PP-1')
    expect((body as { items: unknown[] }).items).toHaveLength(1)
  })

  it('captureOrder calls the capture endpoint', async () => {
    server.use(
      http.post(`${BASE}/orders/o1/capture`, () =>
        HttpResponse.json({ id: 'o1', status: 'PAID' }),
      ),
    )
    const res = await captureOrder('o1')
    expect(res.status).toBe('PAID')
  })
})
