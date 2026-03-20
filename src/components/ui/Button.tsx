import { clsx } from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

export function Button({ variant = 'primary', loading, className, children, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={loading ?? props.disabled}
      className={clsx(
        'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        className,
      )}
    >
      {loading ? '...' : children}
    </button>
  )
}
