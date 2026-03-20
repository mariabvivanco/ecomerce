import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useAuthStore } from '@/domains/auth/auth.store'
import { DesktopNav } from './DesktopNav'

vi.mock('@/domains/auth/useAuth', () => ({
  useAuth: () => ({ handleLogout: vi.fn() }),
}))

function renderNav() {
  return render(<MemoryRouter><DesktopNav /></MemoryRouter>)
}

describe('DesktopNav', () => {
  it('shows login and register when not authenticated', () => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    renderNav()
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByText('Registrarse')).toBeInTheDocument()
  })

  it('shows orders and logout when authenticated', () => {
    useAuthStore.setState({
      user: { id: '1', email: 'a@a.com', firstName: 'Ana', lastName: 'G' },
      isAuthenticated: true,
    })
    renderNav()
    expect(screen.getByText('Mis pedidos')).toBeInTheDocument()
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument()
  })

  it('shows products link always', () => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    renderNav()
    expect(screen.getByText('Productos')).toBeInTheDocument()
  })
})
