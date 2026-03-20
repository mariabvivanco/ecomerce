import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useProducts } from '@/domains/products/product.queries'
import { ProductGrid } from '@/domains/products/ProductGrid'
import { ProductFilters } from '@/domains/products/ProductFilters'
import { Spinner } from '@/components/ui/Spinner'
import { useCartStore } from '@/domains/cart/cart.store'
import type { ProductFilters as Filters } from '@/domains/products/product.types'

export function ProductsPage() {
  const { t } = useTranslation()
  const [filters, setFilters] = useState<Filters>({})
  const { data, isLoading } = useProducts(filters)
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('nav.products')}</h1>
      <div className="flex gap-8">
        <ProductFilters filters={filters} onChange={setFilters} />
        {isLoading ? <Spinner /> : (
          <ProductGrid products={data?.items ?? []} onAddToCart={addItem} />
        )}
      </div>
    </div>
  )
}
