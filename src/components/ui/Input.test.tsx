import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders label', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders input element', () => {
    render(<Input label="Email" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Input label="Email" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
  })

  it('does not show error when not provided', () => {
    render(<Input label="Email" />)
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument()
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Input label="Email" />)
    const input = screen.getByRole('textbox')
    await user.type(input, 'test@example.com')
    expect(input).toHaveValue('test@example.com')
  })
})
