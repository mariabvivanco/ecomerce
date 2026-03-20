import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from './auth.store'

const mockUser = { id: '1', email: 'a@a.com', firstName: 'Ana', lastName: 'García' }

beforeEach(() => useAuthStore.setState({ user: null, isAuthenticated: false }))

describe('auth store', () => {
  it('sets user and marks as authenticated', () => {
    useAuthStore.getState().setUser(mockUser)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    expect(useAuthStore.getState().user).toEqual(mockUser)
  })

  it('clears user on logout', () => {
    useAuthStore.getState().setUser(mockUser)
    useAuthStore.getState().clearUser()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
  })

  it('starts unauthenticated', () => {
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
  })
})
