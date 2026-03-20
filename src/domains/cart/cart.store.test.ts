import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from './cart.store'
import type { Product } from '@/domains/products/product.types'

const mockProduct = (id: string, price = 10): Product => ({
  id, name: `Product ${id}`, slug: id, description: '', price,
  stock: 5, imageUrl: null, featured: false, requiresPrescription: false,
  category: { id: 'c1', name: 'Cat', slug: 'cat' },
})

beforeEach(() => useCartStore.setState({ items: [] }))

describe('cart store', () => {
  it('adds a new item with quantity 1', () => {
    useCartStore.getState().addItem(mockProduct('p1'))
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].quantity).toBe(1)
  })

  it('increments quantity when adding existing item', () => {
    useCartStore.getState().addItem(mockProduct('p1'))
    useCartStore.getState().addItem(mockProduct('p1'))
    expect(useCartStore.getState().items).toHaveLength(1)
    expect(useCartStore.getState().items[0].quantity).toBe(2)
  })

  it('removes an item', () => {
    useCartStore.getState().addItem(mockProduct('p1'))
    useCartStore.getState().removeItem('p1')
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('updates quantity', () => {
    useCartStore.getState().addItem(mockProduct('p1'))
    useCartStore.getState().updateQuantity('p1', 5)
    expect(useCartStore.getState().items[0].quantity).toBe(5)
  })

  it('removes item when quantity updated to 0', () => {
    useCartStore.getState().addItem(mockProduct('p1'))
    useCartStore.getState().updateQuantity('p1', 0)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('clears all items', () => {
    useCartStore.getState().addItem(mockProduct('p1'))
    useCartStore.getState().addItem(mockProduct('p2'))
    useCartStore.getState().clear()
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('calculates total correctly', () => {
    useCartStore.getState().addItem(mockProduct('p1', 10))
    useCartStore.getState().addItem(mockProduct('p1', 10))
    useCartStore.getState().addItem(mockProduct('p2', 5))
    expect(useCartStore.getState().total()).toBe(25)
  })

  it('calculates totalItems correctly', () => {
    useCartStore.getState().addItem(mockProduct('p1'))
    useCartStore.getState().addItem(mockProduct('p1'))
    useCartStore.getState().addItem(mockProduct('p2'))
    expect(useCartStore.getState().totalItems()).toBe(3)
  })
})
