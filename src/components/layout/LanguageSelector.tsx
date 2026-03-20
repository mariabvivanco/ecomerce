import { useTranslation } from 'react-i18next'

export function LanguageSelector() {
  const { i18n } = useTranslation()
  const toggle = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')

  return (
    <button
      onClick={toggle}
      className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
    >
      {i18n.language === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
