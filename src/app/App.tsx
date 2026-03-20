import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import '@/i18n/i18n'
import { Providers } from './Providers'

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}
