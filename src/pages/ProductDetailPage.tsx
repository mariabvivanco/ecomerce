import { useParams } from 'react-router-dom'
import { useProduct } from '@/domains/products/product.queries'
import { ProductDetail } from '@/domains/products/ProductDetail'
import { RelatedProducts } from '@/domains/products/RelatedProducts'
import { Spinner } from '@/components/ui/Spinner'
import { useCartStore } from '@/domains/cart/cart.store'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { data: product, isLoading } = useProduct(slug ?? '')
  const addItem = useCartStore((s) => s.addItem)

  if (isLoading) return <Spinner />
  if (!product) return null

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-12">
      <ProductDetail product={product} onAddToCart={addItem} />
      <RelatedProducts
        categorySlug={product.category.slug}
        excludeId={product.id}
        onAddToCart={addItem}
      />
    </div>
  )
}
