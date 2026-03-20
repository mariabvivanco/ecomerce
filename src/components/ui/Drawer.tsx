import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Drawer({ open, onClose, title, children }: Props) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />}
      <aside
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-lg">{title}</h2>
            <button onClick={onClose} aria-label="close" className="text-gray-500 hover:text-gray-800">
              <X size={20} />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </>
  )
}
