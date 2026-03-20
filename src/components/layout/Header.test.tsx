import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useAuthStore } from '@/domains/auth/auth.store'
import { Header } from './Header'

function renderHeader() {
  return render(<MemoryRouter><Header /></MemoryRouter>)
}

describe('Header', () => {
  it('renders logo', () => {
    renderHeader()
    expect(screen.getByText('Farmacia')).toBeInTheDocument()
  })

  it('shows login and register links when not authenticated', () => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    renderHeader()
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByText('Registrarse')).toBeInTheDocument()
  })

  it('shows orders and logout when authenticated', () => {
    useAuthStore.setState({
      user: { id: '1', email: 'a@a.com', firstName: 'Ana', lastName: 'G' },
      isAuthenticated: true,
    })
    renderHeader()
    expect(screen.getByText('Mis pedidos')).toBeInTheDocument()
    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument()
  })

  it('renders cart button', () => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
    renderHeader()
    expect(screen.getByRole('button', { name: 'Carrito' })).toBeInTheDocument()
  })
})
