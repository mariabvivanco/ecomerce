import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="text-xl text-gray-600">{t('common.notFound')}</p>
      <Link to="/" className="text-blue-600 hover:underline">{t('common.back')}</Link>
    </div>
  )
}
