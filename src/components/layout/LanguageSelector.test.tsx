import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n from '@/i18n/i18n'
import { LanguageSelector } from './LanguageSelector'

describe('LanguageSelector', () => {
  it('shows EN when current language is es', () => {
    i18n.changeLanguage('es')
    render(<LanguageSelector />)
    expect(screen.getByRole('button')).toHaveTextContent('EN')
  })

  it('shows ES when current language is en', () => {
    i18n.changeLanguage('en')
    render(<LanguageSelector />)
    expect(screen.getByRole('button')).toHaveTextContent('ES')
  })

  it('toggles language from es to en on click', async () => {
    i18n.changeLanguage('es')
    const user = userEvent.setup()
    render(<LanguageSelector />)
    await user.click(screen.getByRole('button'))
    expect(i18n.language).toBe('en')
  })

  it('toggles language from en to es on click', async () => {
    i18n.changeLanguage('en')
    const user = userEvent.setup()
    render(<LanguageSelector />)
    await user.click(screen.getByRole('button'))
    expect(i18n.language).toBe('es')
  })
})
