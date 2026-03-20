import { clsx } from 'clsx'
import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function Input({ label, error, className, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className={clsx(
          'px-3 py-2 border rounded-lg text-sm outline-none transition-colors',
          error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:border-blue-500',
          'focus:ring-2 focus:ring-offset-0',
          className,
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
