import { FC, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuthStore } from '../store/useAuthStore'
import Button from '../components/common/Button'
import { Eye, Search, EyeOff, FolderCode } from 'lucide-react'

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-xl shadow-2xl border border-gray-600">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            MarketMind Enterprise
          </h1>
          <p className="text-gray-400 mt-2">Secure access to institutional-grade financial intelligence</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-600 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-green-400 hover:text-green-300">
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            Sign In
          </Button>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don’t have an account?{' '}
            <Link href="/register" className="text-green-400 hover:text-green-300 font-medium">
              Register here
            </Link>
          </p>
        </div>

        {/* SSO Options */}
        <div className="mt-8 border-t border-gray-600 pt-6">
          <p className="text-sm text-gray-400 text-center mb-4">Or sign in with</p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => alert('Google SSO not implemented')}
            >
              <Search className="w-5 h-5" />
              <span>Google</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => alert('Microsoft SSO not implemented')}
            >
              <FolderCode className="w-5 h-5" />
              <span>Microsoft</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login