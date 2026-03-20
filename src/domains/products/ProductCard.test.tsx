import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductCard } from './ProductCard'
import type { Product } from './product.types'

const mockProduct: Product = {
  id: '1', name: 'Paracetamol 500mg', slug: 'paracetamol',
  description: 'Pain relief', price: 3.5, stock: 10,
  imageUrl: null, featured: false, requiresPrescription: false,
  category: { id: 'c1', name: 'Medicamentos', slug: 'medicamentos' },
}

function renderCard(product = mockProduct) {
  return render(
    <MemoryRouter>
      <ProductCard product={product} onAddToCart={vi.fn()} />
    </MemoryRouter>,
  )
}

describe('ProductCard', () => {
  it('renders product name and price', () => {
    renderCard()
    expect(screen.getByText('Paracetamol 500mg')).toBeInTheDocument()
    expect(screen.getByText('3.50 €')).toBeInTheDocument()
  })

  it('calls onAddToCart when button clicked', async () => {
    const user = userEvent.setup()
    const onAddToCart = vi.fn()
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} onAddToCart={onAddToCart} />
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('button'))
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('disables button when out of stock', () => {
    renderCard({ ...mockProduct, stock: 0 })
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows prescription warning when required', () => {
    renderCard({ ...mockProduct, requiresPrescription: true })
    expect(screen.getByText(/receta/i)).toBeInTheDocument()
  })
})
