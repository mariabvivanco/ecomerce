export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export type OrderItem = {
  id: string
  quantity: number
  unitPrice: number
  product: { id: string; name: string; imageUrl: string | null }
}

export type Order = {
  id: string
  email: string
  status: OrderStatus
  total: number
  createdAt: string
  items: OrderItem[]
  shipping: {
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
    country: string
    phone?: string
  } | null
}
