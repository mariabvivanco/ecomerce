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
    <aside className="flex flex-col gap-4 w-64 shrink-0">
      <Input
        label={t('nav.products')}
        placeholder="Buscar..."
        value={filters.search ?? ''}
        onChange={(e) => onChange({ ...filters, search: e.target.value, page: 1 })}
      />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Categoría</label>
        <select
          value={filters.category ?? ''}
          onChange={(e) => onChange({ ...filters, category: e.target.value || undefined, page: 1 })}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="">Todas</option>
          {data?.items.map((cat) => (
            <option key={cat.id} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <Input
          label="Min €"
          type="number"
          value={filters.minPrice ?? ''}
          onChange={(e) => onChange({ ...filters, minPrice: Number(e.target.value) || undefined, page: 1 })}
        />
        <Input
          label="Max €"
          type="number"
          value={filters.maxPrice ?? ''}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) || undefined, page: 1 })}
        />
      </div>
    </aside>
  )
}
