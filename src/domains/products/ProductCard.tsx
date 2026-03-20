import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShoppingCart } from 'lucide-react'
import type { Product } from './product.types'
import { Button } from '@/components/ui/Button'

type Props = {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: Props) {
  const { t } = useTranslation()
  const outOfStock = product.stock === 0

  return (
    <article className="flex flex-col rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/products/${product.slug}`}>
        <img
          src={product.imageUrl ?? '/placeholder.png'}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="flex flex-col gap-2 p-4 flex-1">
        <Link to={`/products/${product.slug}`} className="font-medium hover:text-blue-600 line-clamp-2">
          {product.name}
        </Link>
        <p className="text-blue-600 font-semibold mt-auto">{product.price.toFixed(2)} €</p>
        {product.requiresPrescription && (
          <p className="text-xs text-amber-600">{t('product.requiresPrescription')}</p>
        )}
        <Button onClick={() => onAddToCart(product)} disabled={outOfStock} className="w-full gap-2">
          <ShoppingCart size={16} />
          {outOfStock ? t('product.outOfStock') : t('product.addToCart')}
        </Button>
      </div>
    </article>
  )
}
