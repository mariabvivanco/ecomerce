import { useTranslation } from 'react-i18next'
import { CreditCard } from 'lucide-react'

export function SavedCards() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center gap-3 py-8 text-gray-400">
      <CreditCard className="w-10 h-10" />
      <p className="text-sm">{t('profile.noCards')}</p>
    </div>
  )
}
