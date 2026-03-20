import { useTranslation } from 'react-i18next'
import { ShoppingCart } from 'lucide-react'
import type { Product } from './product.types'
import { Button } from '@/components/ui/Button'

type Props = {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductDetail({ product, onAddToCart }: Props) {
  const { t } = useTranslation()
  const outOfStock = product.stock === 0

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img
        src={product.imageUrl ?? '/placeholder.png'}
        alt={product.name}
        className="w-full md:w-96 h-80 object-cover rounded-xl"
      />
      <div className="flex flex-col gap-4 flex-1">
        <p className="text-sm text-gray-500">{product.category.name}</p>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-3xl font-bold text-blue-600">{product.price.toFixed(2)} €</p>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        {product.requiresPrescription && (
          <p className="text-sm text-amber-600 font-medium">{t('product.requiresPrescription')}</p>
        )}
        <Button onClick={() => onAddToCart(product)} disabled={outOfStock} className="w-fit gap-2 mt-auto">
          <ShoppingCart size={18} />
          {outOfStock ? t('product.outOfStock') : t('product.addToCart')}
        </Button>
      </div>
    </div>
  )
}
