import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import { LinkProps } from 'next/link'

// Combine button, anchor, and Link props
type ElementProps = ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement> | LinkProps

interface ButtonProps extends ElementProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  className?: string
  as?: React.ElementType // Allow rendering as any component (e.g., Link, button, a)
  children?: React.ReactNode // Explicitly include children
  onClick?: (event: React.MouseEvent<HTMLElement>) => void // Explicitly include onClick
  href?: string // Explicitly include href for Link components
}

// Use forwardRef to handle refs correctly for polymorphic components
const Button: FC<ButtonProps> = forwardRef<HTMLElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', className = '', as: Component = 'button', onClick, href, ...props }, ref) => {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md'

    const variantStyles = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500',
      secondary: 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700 focus:ring-gray-500',
      success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-green-400',
      danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400',
      ghost: 'bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-gray-500',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      icon: 'p-2 w-10 h-10 flex items-center justify-center',
    }

    return (
      <Component
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
          relative overflow-hidden
          group
        `}
        onClick={onClick}
        href={href}
        {...props}
      >
        {/* Animated background effect */}
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        {/* Content */}
        <span className="relative flex items-center justify-center gap-2">
          {children}
        </span>
      </Component>
    )
  }
)

Button.displayName = 'Button'

export default Button