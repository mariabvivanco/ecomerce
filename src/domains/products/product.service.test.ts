import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { getProducts, getProductBySlug, getFeaturedProducts } from './product.service'

const BASE = 'http://localhost:4000/api'

const mockProduct = {
  id: '1', name: 'Paracetamol', slug: 'paracetamol', description: 'Pain relief',
  price: 3.5, stock: 10, imageUrl: null, featured: true, requiresPrescription: false,
  category: { id: 'c1', name: 'Medicamentos', slug: 'medicamentos' },
}

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('product service', () => {
  it('getProducts returns paginated list', async () => {
    server.use(
      http.get(`${BASE}/products`, () =>
        HttpResponse.json({ items: [mockProduct], total: 1, page: 1, totalPages: 1 }),
      ),
    )
    const res = await getProducts()
    expect(res.items).toHaveLength(1)
    expect(res.items[0].slug).toBe('paracetamol')
  })

  it('getProducts passes filters as query params', async () => {
    let receivedUrl = ''
    server.use(
      http.get(`${BASE}/products`, ({ request }) => {
        receivedUrl = request.url
        return HttpResponse.json({ items: [], total: 0, page: 1, totalPages: 0 })
      }),
    )
    await getProducts({ category: 'medicamentos', search: 'para' })
    expect(receivedUrl).toContain('category=medicamentos')
    expect(receivedUrl).toContain('search=para')
  })

  it('getProductBySlug returns product', async () => {
    server.use(
      http.get(`${BASE}/products/paracetamol`, () => HttpResponse.json(mockProduct)),
    )
    const res = await getProductBySlug('paracetamol')
    expect(res.id).toBe('1')
  })

  it('getFeaturedProducts returns list', async () => {
    server.use(
      http.get(`${BASE}/products/featured`, () =>
        HttpResponse.json({ items: [mockProduct] }),
      ),
    )
    const res = await getFeaturedProducts()
    expect(res.items).toHaveLength(1)
  })
})
