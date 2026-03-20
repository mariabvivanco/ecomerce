import type { Product } from './product.types'
import { ProductCard } from './ProductCard'

type Props = {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ products, onAddToCart }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
