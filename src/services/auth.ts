import { User } from '../types/user'
import { login as apiLogin, register as apiRegister, updateProfile as apiUpdateProfile } from './api'

export const login = async (email: string, password: string): Promise<User> => {
  const { token, user } = await apiLogin(email, password)
  localStorage.setItem('token', token)
  return user
}

export const register = async (email: string, password: string): Promise<User> => {
  const { token, user } = await apiRegister(email, password)
  localStorage.setItem('token', token)
  return user
}

export const updateProfile = async (data: { email: string }): Promise<User> => {
  return await apiUpdateProfile(data)
}

export const logout = () => {
  localStorage.removeItem('token')
}