import { FC, ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl max-w-lg w-full shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-bold text-green-400">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal