import { create } from 'zustand'
import { Stock, HistoricalData, IntradayData, Option, CompanyOverview, IncomeStatement, BalanceSheet, CashFlow, Earnings, ExchangeRate, CryptoData, CommodityData, EconomicIndicator, TechnicalIndicator, SearchResult } from '../types/stock'
import { getStock, getHistoricalData, getIntradayData, getOptions, getCompanyOverview, getIncomeStatement, getBalanceSheet, getCashFlow, getEarnings, getExchangeRate, getCryptoData, getCommodityData, getEconomicIndicator, getTechnicalIndicator, searchSymbols, getWatchlist } from '../services/api'
import { createWebSocket } from '../services/websocket'

interface StockState {
  stocks: Stock[]
  watchlist: Stock[]
  fetchStocks: (symbol: string) => Promise<void>
  fetchWatchlist: () => Promise<void>
  fetchHistoricalData: (symbol: string, outputsize?: 'compact' | 'full') => Promise<HistoricalData[]>
  fetchIntradayData: (symbol: string, interval: '1min' | '5min' | '15min' | '30min' | '60min', outputsize?: 'compact' | 'full') => Promise<IntradayData[]>
  getOptions: (symbol: string) => Promise<Option[]>
  getCompanyOverview: (symbol: string) => Promise<CompanyOverview>
  getIncomeStatement: (symbol: string) => Promise<IncomeStatement[]>
  getBalanceSheet: (symbol: string) => Promise<BalanceSheet[]>
  getCashFlow: (symbol: string) => Promise<CashFlow[]>
  getEarnings: (symbol: string) => Promise<Earnings[]>
  getExchangeRate: (from_currency: string, to_currency: string) => Promise<ExchangeRate>
  getCryptoData: (symbol: string, market: string) => Promise<CryptoData[]>
  getCommodityData: (function_name: string, interval: 'daily' | 'weekly' | 'monthly') => Promise<CommodityData[]>
  getEconomicIndicator: (function_name: string) => Promise<EconomicIndicator[]>
  getTechnicalIndicator: (function_name: string, symbol: string, interval: string, time_period: number) => Promise<TechnicalIndicator[]>
  searchSymbols: (keywords: string) => Promise<SearchResult[]>
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

  fetchHistoricalData: async (symbol: string, outputsize = 'compact') => {
    try {
      return await getHistoricalData(symbol, outputsize)
    } catch (error) {
      console.error('Error fetching historical data:', error)
      return []
    }
  },

  fetchIntradayData: async (symbol: string, interval, outputsize = 'compact') => {
    try {
      return await getIntradayData(symbol, interval, outputsize)
    } catch (error) {
      console.error('Error fetching intraday data:', error)
      return []
    }
  },

  getOptions: async (symbol: string) => {
    try {
      return await getOptions(symbol)
    } catch (error) {
      console.error('Error fetching options:', error)
      return []
    }
  },

  getCompanyOverview: async (symbol: string) => {
    try {
      return await getCompanyOverview(symbol)
    } catch (error) {
      console.error('Error fetching company overview:', error)
      throw error
    }
  },

  getIncomeStatement: async (symbol: string) => {
    try {
      return await getIncomeStatement(symbol)
    } catch (error) {
      console.error('Error fetching income statement:', error)
      return []
    }
  },

  getBalanceSheet: async (symbol: string) => {
    try {
      return await getBalanceSheet(symbol)
    } catch (error) {
      console.error('Error fetching balance sheet:', error)
      return []
    }
  },

  getCashFlow: async (symbol: string) => {
    try {
      return await getCashFlow(symbol)
    } catch (error) {
      console.error('Error fetching cash flow:', error)
      return []
    }
  },

  getEarnings: async (symbol: string) => {
    try {
      return await getEarnings(symbol)
    } catch (error) {
      console.error('Error fetching earnings:', error)
      return []
    }
  },

  getExchangeRate: async (from_currency: string, to_currency: string) => {
    try {
      return await getExchangeRate(from_currency, to_currency)
    } catch (error) {
      console.error('Error fetching exchange rate:', error)
      throw error
    }
  },

  getCryptoData: async (symbol: string, market: string) => {
    try {
      return await getCryptoData(symbol, market)
    } catch (error) {
      console.error('Error fetching crypto data:', error)
      return []
    }
  },

  getCommodityData: async (function_name: string, interval: 'daily' | 'weekly' | 'monthly') => {
    try {
      return await getCommodityData(function_name, interval)
    } catch (error) {
      console.error('Error fetching commodity data:', error)
      return []
    }
  },

  getEconomicIndicator: async (function_name: string) => {
    try {
      return await getEconomicIndicator(function_name)
    } catch (error) {
      console.error('Error fetching economic indicator:', error)
      return []
    }
  },

  getTechnicalIndicator: async (function_name: string, symbol: string, interval: string, time_period: number) => {
    try {
      return await getTechnicalIndicator(function_name, symbol, interval, time_period)
    } catch (error) {
      console.error('Error fetching technical indicator:', error)
      return []
    }
  },

  searchSymbols: async (keywords: string) => {
    try {
      return await searchSymbols(keywords)
    } catch (error) {
      console.error('Error searching symbols:', error)
      return []
    }
  },
}))
