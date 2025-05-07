import { create } from 'zustand'
import { Stock, HistoricalData } from '../types/stock'
import { Prediction } from '../types/prediction'
import { getStock, getHistoricalData, getPrediction, getWatchlist } from '../services/api'
import { createWebSocket } from '../services/websocket'

interface StockState {
  stocks: Stock[]
  watchlist: Stock[]
  fetchStocks: () => Promise<void>
  fetchWatchlist: () => Promise<void>
  fetchHistoricalData: (symbol: string) => Promise<HistoricalData[]>
  fetchPrediction: (symbol: string) => Promise<Prediction>
}

export const useStockStore = create<StockState>((set) => ({
  stocks: [],
  watchlist: [],
  fetchStocks: async () => {
    const ws = createWebSocket((data) => {
      set((state) => ({
        stocks: state.stocks.map((s) => (s.symbol === data.symbol ? data : s)),
      }))
    })
    return () => ws.close()
  },
  fetchWatchlist: async () => {
    const watchlist = await getWatchlist()
    set({ watchlist })
  },
  fetchHistoricalData: async (symbol: string) => {
    return await getHistoricalData(symbol)
  },
  fetchPrediction: async (symbol: string) => {
    return await getPrediction(symbol)
  },
}))
