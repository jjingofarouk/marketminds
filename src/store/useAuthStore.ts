import { create } from 'zustand'
import { User } from '../types/user'
import { login, register, updateProfile, logout } from '../services/auth'

interface AuthState {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  updateProfile: (data: { email: string }) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    const user = await login(email, password)
    set({ user })
  },
  register: async (email: string, password: string) => {
    const user = await register(email, password)
    set({ user })
  },
  updateProfile: async (data: { email: string }) => {
    const user = await updateProfile(data)
    set({ user })
  },
  logout: () => {
    logout()
    set({ user: null })
  },
}))
