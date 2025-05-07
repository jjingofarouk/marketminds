import { create } from 'zustand'
import { Stock, HistoricalData } from 'types/stock'
import { Prediction } from 'types/prediction'
import { getStock, getHistoricalData, getPrediction, getWatchlist } from 'services/api'
import { createWebSocket } from 'services/websocket'

interface StockState {
  stocks: Stock[]
  watchlist: Stock[]
  fetchStocks: (symbol: string) => Promise<void>
  fetchWatchlist: () => Promise<void>
  fetchHistoricalData: (symbol: string) => Promise<HistoricalData[]>
  fetchPrediction: (symbol: string) => Promise<Prediction | null>
}

export const useStockStore = create<StockState>((set) => ({
  stocks: [],
  watchlist: [],
  fetchStocks: async (symbol: string) => {
    try {
      const stock = await getStock(symbol)
      set((state) => ({
        stocks: state.stocks.some((s) => s.symbol === stock.symbol)
          ? state.stocks.map((s) => (s.symbol === stock.symbol ? stock : s))
          : [...state.stocks, stock],
      }))

      const ws = createWebSocket((data) => {
        set((state) => ({
          stocks: state.stocks.some((s) => s.symbol === data.symbol)
            ? state.stocks.map((s) => (s.symbol === data.symbol ? data : s))
            : [...state.stocks, data],
        }))
      })
    } catch (error) {
      console.error('Error fetching stocks:', error)
    }
  },
  fetchWatchlist: async () => {
    try {
      const watchlist = await getWatchlist()
      set({ watchlist })
    } catch (error) {
      console.error('Error fetching watchlist:', error)
    }
  },
  fetchHistoricalData: async (symbol: string) => {
    try {
      return await getHistoricalData(symbol)
    } catch (error) {
      console.error('Error fetching historical data:', error)
      return []
    }
  },
  fetchPrediction: async (symbol: string) => {
    try {
      return await getPrediction(symbol)
    } catch (error) {
      console.error('Error fetching prediction:', error)
      return null
    }
  },
}))