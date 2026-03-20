import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SlidersHorizontal } from 'lucide-react'
import { useProducts } from '@/domains/products/product.queries'
import { ProductGrid } from '@/domains/products/ProductGrid'
import { ProductFilters } from '@/domains/products/ProductFilters'
import { Spinner } from '@/components/ui/Spinner'
import { useCartStore } from '@/domains/cart/cart.store'
import type { ProductFilters as Filters } from '@/domains/products/product.types'

export function ProductsPage() {
  const { t } = useTranslation()
  const [filters, setFilters] = useState<Filters>({})
  const [showFilters, setShowFilters] = useState(false)
  const { data, isLoading } = useProducts(filters)
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('nav.products')}</h1>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="flex items-center gap-2 md:hidden text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"
        >
          <SlidersHorizontal size={16} />
          {t('product.filters')}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <ProductFilters filters={filters} onChange={setFilters} />
        </div>
        {isLoading ? <Spinner /> : (
          <ProductGrid products={data?.items ?? []} onAddToCart={addItem} />
        )}
      </div>
    </div>
  )
}
