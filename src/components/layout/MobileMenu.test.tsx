import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useAuthStore } from '@/domains/auth/auth.store'
import { MobileMenu } from './MobileMenu'

const mockLogout = vi.fn()
vi.mock('@/domains/auth/useAuth', () => ({
  useAuth: () => ({ handleLogout: mockLogout }),
}))

function renderMenu(onClose = vi.fn()) {
  return render(<MemoryRouter><MobileMenu onClose={onClose} /></MemoryRouter>)
}

describe('MobileMenu', () => {
  it('shows login and register when not authenticated', () => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    renderMenu()
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByText('Registrarse')).toBeInTheDocument()
  })

  it('shows orders, profile and logout when authenticated', () => {
    useAuthStore.setState({
      user: { id: '1', email: 'a@a.com', firstName: 'Ana', lastName: 'G' },
      isAuthenticated: true,
    })
    renderMenu()
    expect(screen.getByText('Mis pedidos')).toBeInTheDocument()
    expect(screen.getByText('Mi perfil')).toBeInTheDocument()
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument()
  })

  it('calls onClose when a link is clicked', () => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    const onClose = vi.fn()
    renderMenu(onClose)
    fireEvent.click(screen.getByText('Productos'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls logout and onClose when logout is clicked', () => {
    useAuthStore.setState({
      user: { id: '1', email: 'a@a.com', firstName: 'Ana', lastName: 'G' },
      isAuthenticated: true,
    })
    const onClose = vi.fn()
    renderMenu(onClose)
    fireEvent.click(screen.getByText('Cerrar sesión'))
    expect(mockLogout).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })
})
