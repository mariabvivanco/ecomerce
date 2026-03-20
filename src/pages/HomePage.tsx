import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFeaturedProducts, useCategories } from '@/domains/products/product.queries'
import { ProductCarousel } from '@/domains/products/ProductCarousel'
import { Spinner } from '@/components/ui/Spinner'
import { useCartStore } from '@/domains/cart/cart.store'

export function HomePage() {
  const { t } = useTranslation()
  const { data: featured, isLoading } = useFeaturedProducts()
  const { data: categories } = useCategories()
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{t('product.featured')}</h1>
        {isLoading ? <Spinner /> : (
          <ProductCarousel products={featured?.items ?? []} onAddToCart={addItem} />
        )}
      </section>

      {categories && categories.items.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{t('home.categories')}</h2>
          <div className="flex flex-wrap gap-3">
            {categories.items.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.slug}`}
                className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
