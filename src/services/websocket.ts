import { Stock } from '../types/stock'

export const createWebSocket = (onMessage: (data: Stock) => void) => {
  const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/ws/stocks`)

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    onMessage(data)
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
  }

  return ws
}
