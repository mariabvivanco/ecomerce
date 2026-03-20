import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders current year', () => {
    render(<Footer />)
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument()
  })

  it('renders privacy link', () => {
    render(<Footer />)
    expect(screen.getByText('Privacidad')).toBeInTheDocument()
  })

  it('renders terms link', () => {
    render(<Footer />)
    expect(screen.getByText('Términos')).toBeInTheDocument()
  })

  it('renders contact link', () => {
    render(<Footer />)
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })
})
