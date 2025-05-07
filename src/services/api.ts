import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const getStock = async (symbol: string) => {
  const response = await api.get(`/api/stocks/${symbol}`)
  return response.data
}

export const getHistoricalData = async (symbol: string) => {
  const response = await api.get(`/api/stocks/${symbol}/history`)
  return response.data
}

export const getPrediction = async (symbol: string) => {
  const response = await api.get(`/api/predictions/${symbol}`)
  return response.data
}

export const getWatchlist = async () => {
  const response = await api.get('/api/watchlist', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await api.post('/api/users/login', { email, password })
  return response.data
}

export const register = async (email: string, password: string) => {
  const response = await api.post('/api/users/register', { email, password })
  return response.data
}

export const updateProfile = async (data: { email: string }) => {
  const response = await api.put('/api/users/profile', data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
  return response.data
}
