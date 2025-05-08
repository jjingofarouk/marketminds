import { FC, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Button from '../components/common/Button'
import { User, Edit2, Save, X } from 'lucide-react'

const Profile: FC = () => {
  const { user, updateProfile } = useAuthStore()
  const [email, setEmail] = useState(user?.email || '')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await updateProfile({ email })
      alert('Profile updated successfully')
      setIsEditing(false)
    } catch (error) {
      alert('Profile update failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEmail(user?.email || '')
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-gradient-to-br from-gray-800 to-gray-700 p-8 rounded-xl shadow-2xl border border-gray-600">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <User className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              User Profile
            </h1>
          </div>
          {!isEditing && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </Button>
          )}
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
                !isEditing ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              placeholder="Enter your email"
            />
          </div>
          {isEditing && (
            <div className="flex space-x-4">
              <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center space-x-2 group relative overflow-hidden flex-1"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Save className="w-5 h-5" />
                <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={handleCancel}
                className="flex items-center space-x-2 flex-1"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </Button>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-600">
          <p className="text-sm text-gray-400">
            Need to update other details or manage your account?{' '}
            <a href="/support" className="text-green-400 hover:text-green-300 font-medium">
              Contact Enterprise Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile