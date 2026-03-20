import useEmblaCarousel from 'embla-carousel-react'
import type { Product } from './product.types'
import { ProductCard } from './ProductCard'

type Props = {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductCarousel({ products, onAddToCart }: Props) {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start' })

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-4">
        {products.map((product) => (
          <div key={product.id} className="flex-none w-56">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </div>
  )
}
