import { api } from '@/lib/axios'
import type { Product, ProductFilters, ProductListResponse } from './product.types'

export async function getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
  const res = await api.get<ProductListResponse>('/products', { params: filters })
  return res.data
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const res = await api.get<Product>(`/products/${slug}`)
  return res.data
}

export async function getFeaturedProducts(): Promise<{ items: Product[] }> {
  const res = await api.get<{ items: Product[] }>('/products/featured')
  return res.data
}

export async function getCategories(): Promise<{ items: Category[] }> {
  const res = await api.get<{ items: Category[] }>('/categories')
  return res.data
}

type Category = { id: string; name: string; slug: string }
