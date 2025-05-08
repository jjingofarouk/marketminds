import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Sun, Moon, LogOut, User, Briefcase, Bookmark, TrendingUp, Bell, Search, ChevronDown, Settings } from 'lucide-react'
import Button from './common/Button'
import { useAuthStore } from '../store/useAuthStore'
import { useThemeStore } from '../store/useThemeStore'

const Header: FC = () => {
  const { user, logout } = useAuthStore()
  const { toggleTheme, isDark } = useThemeStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    if (showProfileMenu) setShowProfileMenu(false)
  }

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu)
    if (showNotifications) setShowNotifications(false)
  }

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black bg-opacity-80 backdrop-blur-md' : 'bg-gradient-to-r from-gray-900 to-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-purple-500 tracking-tight flex items-center"
          >
            <TrendingUp className="w-8 h-8 mr-2 text-green-400" />
            <span>MarketMind</span>
            <span className="text-green-400 font-light ml-1">Pro</span>
          </Link>
        </div>

        {/* Center search */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search stocks, crypto, news..."
              className="w-full bg-gray-800 bg-opacity-50 rounded-full py-2 pl-10 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-gray-800"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/markets"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 text-sm"
                >
                  Markets
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 text-sm"
                >
                  Dashboard
                </Link>
                <Link
                  href="/portfolio"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200 text-sm"
                >
                  Portfolio
                </Link>

                {/* Notifications */}
                <div className="relative">
                  <Button
                    onClick={toggleNotifications}
                    variant="ghost"
                    size="icon"
                    className="relative"
                  >
                    <Bell className="w-5 h-5 text-gray-300 hover:text-white" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                  </Button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-700">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                          <p className="text-xs text-green-400">MARKET ALERT</p>
                          <p className="text-sm text-white">TSLA up 5% in pre-market trading</p>
                          <p className="text-xs text-gray-400">10 mins ago</p>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                          <p className="text-xs text-blue-400">WATCHLIST</p>
                          <p className="text-sm text-white">AAPL earnings report released</p>
                          <p className="text-xs text-gray-400">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Theme Toggle */}
                <Button
                  onClick={toggleTheme}
                  variant="ghost"
                  size="icon"
                  className="relative"
                >
                  {isDark ? <Sun className="w-5 h-5 text-gray-300 hover:text-white" /> : <Moon className="w-5 h-5 text-gray-300 hover:text-white" />}
                </Button>

                {/* Profile Menu */}
                <div className="relative">
                  <Button
                    onClick={toggleProfileMenu}
                    variant="ghost"
                    className="flex items-center space-x-2 relative"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                  </Button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 border border-gray-700">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-700 my-1"></div>
                      <button
                        onClick={logout}
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Button
                  as={Link}
                  href="/register"
                  variant="primary"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Free Trial
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="relative"
            >
              {isDark ? <Sun className="w-5 h-5 text-gray-300" /> : <Moon className="w-5 h-5 text-gray-300" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center justify-center"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-6 h-6 text-gray-300" />
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-gray-900 px-4 py-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search stocks, crypto, news..."
            className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="/markets"
            className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Markets
          </Link>
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
              <Link
                href="/settings"
                className="flex items-center text-gray-300 hover:text-white font-medium transition-colors duration-200"
                onClick={toggleMobileMenu}
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Link>
              <div className="border-t border-gray-700 my-2"></div>
              <Button
                onClick={() => {
                  logout()
                  toggleMobileMenu()
                }}
                variant="ghost"
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
              <Button
                as={Link}
                href="/register"
                variant="primary"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center"
                onClick={toggleMobileMenu}
              >
                Start Free Trial
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header