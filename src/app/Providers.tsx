import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Toaster } from 'sonner'
import { queryClient } from '@/lib/queryClient'

type Props = { children: ReactNode }

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <PayPalScriptProvider
        options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID as string }}
      >
        {children}
        <Toaster richColors position="top-right" />
      </PayPalScriptProvider>
    </QueryClientProvider>
  )
}
