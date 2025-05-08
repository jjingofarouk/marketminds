import { FC } from 'react'
import Link from 'next/link'
import Button from './common/Button'
import { useAuthStore } from '../store/useAuthStore'
import { useThemeStore } from '../store/useThemeStore'

const Header: FC = () => {
  const { user, logout } = useAuthStore()
  const { toggleTheme, isDark } = useThemeStore()

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-tight"
        >
          MarketMind
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-4 sm:space-x-6">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  Profile
                </Link>
                <Button
                  onClick={logout}
                  variant="secondary"
                  size="sm"
                  className="hover:shadow-lg"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
            <Button
              onClick={toggleTheme}
              size="sm"
              className="relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center justify-center"
              onClick={() => {
                // Implement mobile menu toggle logic here
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu (Hidden by Default) */}
      <div className="md:hidden bg-gray-800 px-4 py-4 hidden">
        <div className="flex flex-col space-y-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
              >
                Profile
              </Link>
              <Button
                onClick={logout}
                variant="secondary"
                size="sm"
                className="w-full text-left"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header