import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<Modal open={false} onClose={() => {}}><p>Content</p></Modal>)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('renders children when open', () => {
    render(<Modal open={true} onClose={() => {}}><p>Content</p></Modal>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Modal open={true} onClose={() => {}} title="Confirm"><p>Body</p></Modal>)
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Modal open={true} onClose={onClose}><p>Content</p></Modal>)
    await user.click(screen.getByRole('button'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when backdrop clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Modal open={true} onClose={onClose} title="Test"><p>Content</p></Modal>)
    const backdrop = document.querySelector('.fixed.inset-0.bg-black\\/40') as HTMLElement
    await user.click(backdrop)
    expect(onClose).toHaveBeenCalledOnce()
  })
})
