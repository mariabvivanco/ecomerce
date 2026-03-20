import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { api } from './axios'
import { useAuthStore } from '@/domains/auth/auth.store'

const BASE = 'http://localhost:4000/api'

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  useAuthStore.setState({ user: null, isAuthenticated: false })
})
afterAll(() => server.close())

describe('api interceptor', () => {
  it('resolves successful responses', async () => {
    server.use(
      http.get(`${BASE}/health`, () => HttpResponse.json({ ok: true })),
    )
    const res = await api.get('/health')
    expect(res.data).toEqual({ ok: true })
  })

  it('clears auth store on 401', async () => {
    useAuthStore.setState({
      user: { id: '1', email: 'a@a.com', firstName: 'A', lastName: 'B' },
      isAuthenticated: true,
    })

    server.use(
      http.get(`${BASE}/protected`, () =>
        HttpResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      ),
    )

    await api.get('/protected').catch(() => null)

    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
  })

  it('rejects non-401 errors without clearing auth', async () => {
    useAuthStore.setState({
      user: { id: '1', email: 'a@a.com', firstName: 'A', lastName: 'B' },
      isAuthenticated: true,
    })

    server.use(
      http.get(`${BASE}/broken`, () =>
        HttpResponse.json({ error: 'Server error' }, { status: 500 }),
      ),
    )

    await api.get('/broken').catch(() => null)

    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })
})
