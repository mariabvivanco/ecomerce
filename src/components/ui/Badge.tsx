import { clsx } from 'clsx'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  variant?: 'default' | 'blue' | 'green' | 'yellow' | 'red'
  className?: string
}

export function Badge({ children, variant = 'default', className }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-gray-100 text-gray-600',
        variant === 'blue' && 'bg-blue-100 text-blue-700',
        variant === 'green' && 'bg-green-100 text-green-700',
        variant === 'yellow' && 'bg-yellow-100 text-yellow-700',
        variant === 'red' && 'bg-red-100 text-red-700',
        className,
      )}
    >
      {children}
    </span>
  )
}
