import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { getProfile, updateProfile } from './customer.service'
import type { CustomerProfile } from './customer.types'

const BASE = 'http://localhost:4000/api'

const mockProfile: CustomerProfile = {
  id: 'user-1',
  email: 'user@test.com',
  firstName: 'Ana',
  lastName: 'García',
  createdAt: '2024-01-01T00:00:00.000Z',
  billingAddress: null,
}

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('customer service', () => {
  it('getProfile returns customer profile', async () => {
    server.use(
      http.get(`${BASE}/customers/me`, () => HttpResponse.json(mockProfile)),
    )
    const res = await getProfile()
    expect(res.email).toBe('user@test.com')
    expect(res.firstName).toBe('Ana')
  })

  it('updateProfile sends data and returns updated profile', async () => {
    const updated = { ...mockProfile, firstName: 'María' }
    server.use(
      http.put(`${BASE}/customers/me`, () => HttpResponse.json(updated)),
    )
    const res = await updateProfile({ firstName: 'María' })
    expect(res.firstName).toBe('María')
  })

  it('getProfile rejects on 401', async () => {
    server.use(
      http.get(`${BASE}/customers/me`, () =>
        HttpResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      ),
    )
    await expect(getProfile()).rejects.toThrow()
  })
})
