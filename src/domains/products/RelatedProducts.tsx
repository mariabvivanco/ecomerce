import { useTranslation } from 'react-i18next'
import { useProducts } from './product.queries'
import { ProductCarousel } from './ProductCarousel'
import { Spinner } from '@/components/ui/Spinner'
import type { Product } from './product.types'

type Props = {
  categorySlug: string
  excludeId: string
  onAddToCart: (product: Product) => void
}

export function RelatedProducts({ categorySlug, excludeId, onAddToCart }: Props) {
  const { t } = useTranslation()
  const { data, isLoading } = useProducts({ category: categorySlug, limit: 8 })

  const related = data?.items.filter((p) => p.id !== excludeId) ?? []
  if (isLoading) return <Spinner />
  if (related.length === 0) return null

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{t('product.featured')}</h2>
      <ProductCarousel products={related} onAddToCart={onAddToCart} />
    </section>
  )
}
