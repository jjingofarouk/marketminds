import { FC, useState } from 'react'
import Link from 'next/link'
import { Menu, Sun, Moon, LogOut, User, Briefcase, Bookmark } from 'lucide-react'
import Button from './common/Button'
import { useAuthStore } from '../store/useAuthStore'
import { useThemeStore } from '../store/useThemeStore'

const Header: FC = () => {
  const { user, logout } = useAuthStore()
  const { toggleTheme, isDark } = useThemeStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
                  className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  Dashboard
                </Link>
                <Link
                  href="/portfolio"
                  className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  <Bookmark className="w-5 h-5 mr-2" />
                  Portfolio
                </Link>
                <Link
                  href="/watchlist"
                  className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  <Bookmark className="w-5 h-5 mr-2" />
                  Watchlist
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                <Button
                  onClick={logout}
                  variant="secondary"
                  size="sm"
                  className="flex items-center hover:shadow-lg"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  <User className="w-5 h-5 mr-2" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  <User className="w-5 h-5 mr-2" />
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
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center justify-center"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-gray-800 px-4 py-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <Bookmark className="w-5 h-5 mr-2" />
                Portfolio
              </Link>
              <Link
                href="/watchlist"
                className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <Bookmark className="w-5 h-5 mr-2" />
                Watchlist
              </Link>
              <Link
                href="/profile"
                className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <User className="w-5 h-5 mr-2" />
                Profile
              </Link>
              <Button
                onClick={() => {
                  logout()
                  toggleMobileMenu()
                }}
                variant="secondary"
                size="sm"
                className="flex items-center w-full text-left"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <User className="w-5 h-5 mr-2" />
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <User className="w-5 h-5 mr-2" />
                Register
              </Link>
            </>
          )}
          <Button
            onClick={() => {
              toggleTheme()
              toggleMobileMenu()
            }}
            size="sm"
            className="flex items-center w-full text-left relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            {isDark ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header