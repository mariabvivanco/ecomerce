import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/Input'
import { useCategories } from './product.queries'
import type { ProductFilters as Filters } from './product.types'

type Props = {
  filters: Filters
  onChange: (filters: Filters) => void
}

export function ProductFilters({ filters, onChange }: Props) {
  const { t } = useTranslation()
  const { data } = useCategories()

  return (
    <aside className="flex flex-col gap-4 w-full md:w-64 shrink-0">
      <Input
        label={t('product.search')}
        placeholder={t('product.searchPlaceholder')}
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">{t('product.category')}</label>
        <select
          value={filters.category ?? ''}
          onChange={(e) => onChange({ ...filters, category: e.target.value || undefined, page: 1 })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          <option value="">{t('product.allCategories')}</option>
          {data?.items.map((cat) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700">{t('product.priceRange')}</p>
        <div className="grid grid-cols-2 gap-2">
          <Input
            label={t('product.minPrice')}
            type="number"
            min="0"
            placeholder="0"
            value={filters.minPrice ?? ''}
            onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) || undefined, page: 1 })}
          />
          <Input
            label={t('product.maxPrice')}
            type="number"
            min="0"
            placeholder="—"
            value={filters.maxPrice ?? ''}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) || undefined, page: 1 })}
          />
        </div>
      </div>
    </aside>
  )
}
