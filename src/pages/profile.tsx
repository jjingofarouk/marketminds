import { FC, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import Button from '../components/common/Button'

const Profile: FC = () => {
  const { user, updateProfile } = useAuthStore()
  const [email, setEmail] = useState(user?.email || '')

  const handleSubmit = async () => {
    try {
      await updateProfile({ email })
      alert('Profile updated')
    } catch (error) {
      alert('Update failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-600 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
        <Button onClick={handleSubmit}>Update</Button>
      </div>
    </div>
  )
}

export default Profile
