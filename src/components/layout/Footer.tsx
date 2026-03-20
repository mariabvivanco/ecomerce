import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Farmacia Online</p>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-gray-900">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-gray-900">{t('footer.terms')}</a>
          <a href="#" className="hover:text-gray-900">{t('footer.contact')}</a>
        </nav>
      </div>
    </footer>
  )
}
