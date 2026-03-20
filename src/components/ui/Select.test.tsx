import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from './Select'

describe('Select', () => {
  it('renders label', () => {
    render(<Select label="Country"><option value="ES">Spain</option></Select>)
    expect(screen.getByText('Country')).toBeInTheDocument()
  })

  it('renders select element with options', () => {
    render(
      <Select label="Country">
        <option value="ES">Spain</option>
        <option value="FR">France</option>
      </Select>,
    )
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Spain')).toBeInTheDocument()
    expect(screen.getByText('France')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Select label="Country" error="Required"><option value="">-</option></Select>)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('does not show error when not provided', () => {
    render(<Select label="Country"><option value="">-</option></Select>)
    expect(screen.queryByText('Required')).not.toBeInTheDocument()
  })

  it('changes value on user interaction', async () => {
    const user = userEvent.setup()
    render(
      <Select label="Country">
        <option value="ES">Spain</option>
        <option value="FR">France</option>
      </Select>,
    )
    await user.selectOptions(screen.getByRole('combobox'), 'FR')
    expect(screen.getByRole('combobox')).toHaveValue('FR')
  })
})
