import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders children', () => {
    render(<Drawer open={true} onClose={() => {}}><p>Drawer content</p></Drawer>)
    expect(screen.getByText('Drawer content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Drawer open={true} onClose={() => {}} title="Cart"><p>Content</p></Drawer>)
    expect(screen.getByText('Cart')).toBeInTheDocument()
  })

  it('shows backdrop when open', () => {
    render(<Drawer open={true} onClose={() => {}}><p>Content</p></Drawer>)
    expect(document.querySelector('.bg-black\\/40')).toBeInTheDocument()
  })

  it('hides backdrop when closed', () => {
    render(<Drawer open={false} onClose={() => {}}><p>Content</p></Drawer>)
    expect(document.querySelector('.bg-black\\/40')).not.toBeInTheDocument()
  })

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Drawer open={true} onClose={onClose} title="Cart"><p>Content</p></Drawer>)
    await user.click(screen.getByRole('button', { name: 'close' }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
