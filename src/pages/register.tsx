import { FC, FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from 'store/useAuthStore'
import Button from 'components/common/Button'

const Register: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await register(email, password)
      router.push('/dashboard')
    } catch (error) {
      alert('Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
            required
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  )
}

export default Register
