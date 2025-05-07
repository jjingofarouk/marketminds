import { FC } from 'react'
import Link from 'next/link'
import Button from './common/Button'
import { useAuthStore } from 'store/useAuthStore'
import { useThemeStore } from 'store/useThemeStore'

const Header: FC = () => {
  const { user, logout } = useAuthStore()
  const { toggleTheme, isDark } = useThemeStore()

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          MarketMind
        </Link>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 dark:text-gray-300">
                Dashboard
              </Link>
              <Link href="/profile" className="text-gray-600 dark:text-gray-300">
                Profile
              </Link>
              <Button onClick={logout} variant="secondary">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 dark:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="text-gray-600 dark:text-gray-300">
                Register
              </Link>
            </>
          )}
          <Button onClick={toggleTheme}>
            {isDark ? 'Light' : 'Dark'}
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header
