import { useQuery } from '@tanstack/react-query'
import * as productService from './product.service'
import type { ProductFilters } from './product.types'

export const productKeys = {
  all: ['products'] as const,
  list: (filters?: ProductFilters) => ['products', 'list', filters] as const,
  detail: (slug: string) => ['products', 'detail', slug] as const,
  featured: () => ['products', 'featured'] as const,
  categories: () => ['categories'] as const,
}

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productService.getProducts(filters),
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => productService.getProductBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: productService.getFeaturedProducts,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: productService.getCategories,
  })
}
