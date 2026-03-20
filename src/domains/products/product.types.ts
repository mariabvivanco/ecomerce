export type Category = {
  id: string
  name: string
  slug: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  stock: number
  imageUrl: string | null
  featured: boolean
  requiresPrescription: boolean
  category: Category
}

export type ProductFilters = {
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}

export type ProductListResponse = {
  items: Product[]
  total: number
  page: number
  totalPages: number
}
