import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Pending</Badge>)
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('applies blue variant classes', () => {
    render(<Badge variant="blue">Paid</Badge>)
    expect(screen.getByText('Paid')).toHaveClass('bg-blue-100', 'text-blue-700')
  })

  it('applies green variant classes', () => {
    render(<Badge variant="green">Delivered</Badge>)
    expect(screen.getByText('Delivered')).toHaveClass('bg-green-100', 'text-green-700')
  })

  it('applies red variant classes', () => {
    render(<Badge variant="red">Cancelled</Badge>)
    expect(screen.getByText('Cancelled')).toHaveClass('bg-red-100', 'text-red-700')
  })

  it('applies default classes when no variant given', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default')).toHaveClass('bg-gray-100', 'text-gray-600')
  })
})
