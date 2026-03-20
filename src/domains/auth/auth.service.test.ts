import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { login, register, logout } from './auth.service'

const BASE = 'http://localhost:4000/api'
const mockUser = { id: '1', email: 'a@a.com', firstName: 'Ana', lastName: 'García' }

const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('auth service', () => {
  it('login returns user', async () => {
    server.use(
      http.post(`${BASE}/auth/login`, () => HttpResponse.json({ user: mockUser })),
    )
    const res = await login({ email: 'a@a.com', password: 'pass' })
    expect(res.user).toEqual(mockUser)
  })

  it('register returns user', async () => {
    server.use(
      http.post(`${BASE}/auth/register`, () => HttpResponse.json({ user: mockUser }, { status: 201 })),
    )
    const res = await register({ email: 'a@a.com', password: 'password1', firstName: 'Ana', lastName: 'García' })
    expect(res.user.email).toBe('a@a.com')
  })

  it('logout resolves without error', async () => {
    server.use(
      http.post(`${BASE}/auth/logout`, () => HttpResponse.json({ message: 'Logged out' })),
    )
    await expect(logout()).resolves.toBeUndefined()
  })

  it('login rejects on 401', async () => {
    server.use(
      http.post(`${BASE}/auth/login`, () =>
        HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 }),
      ),
    )
    await expect(login({ email: 'wrong@a.com', password: 'bad' })).rejects.toThrow()
  })
})
