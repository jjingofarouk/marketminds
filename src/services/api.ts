import axios from 'axios'
import {
  Stock, HistoricalData, IntradayData, Option, CompanyOverview, IncomeStatement,
  BalanceSheet, CashFlow, Earnings, ExchangeRate, CryptoData, CommodityData,
  EconomicIndicator, TechnicalIndicator, SearchResult
} from '../types/stock'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const getStock = async (symbol: string): Promise<Stock> => {
  const response = await axios.get(`${API_URL}/stocks/quote/${symbol}`)
  return response.data
}

export const getHistoricalData = async (symbol: string, outputsize: 'compact' | 'full' = 'compact'): Promise<HistoricalData[]> => {
  const response = await axios.get(`${API_URL}/stocks/historical/${symbol}?outputsize=${outputsize}`)
  return response.data
}

export const getIntradayData = async (symbol: string, interval: '1min' | '5min' | '15min' | '30min' | '60min', outputsize: 'compact' | 'full' = 'compact'): Promise<IntradayData[]> => {
  const response = await axios.get(`${API_URL}/stocks/intraday/${symbol}?interval=${interval}&outputsize=${outputsize}`)
  return response.data
}

export const getOptions = async (symbol: string): Promise<Option[]> => {
  const response = await axios.get(`${API_URL}/options/${symbol}`)
  return response.data
}

export const getCompanyOverview = async (symbol: string): Promise<CompanyOverview> => {
  const response = await axios.get(`${API_URL}/fundamentals/overview/${symbol}`)
  return response.data
}

export const getIncomeStatement = async (symbol: string): Promise<IncomeStatement[]> => {
  const response = await axios.get(`${API_URL}/fundamentals/income/${symbol}`)
  return response.data
}

export const getBalanceSheet = async (symbol: string): Promise<BalanceSheet[]> => {
  const response = await axios.get(`${API_URL}/fundamentals/balance/${symbol}`)
  return response.data
}

export const getCashFlow = async (symbol: string): Promise<CashFlow[]> => {
  const response = await axios.get(`${API_URL}/fundamentals/cashflow/${symbol}`)
  return response.data
}

export const getEarnings = async (symbol: string): Promise<Earnings[]> => {
  const response = await axios.get(`${API_URL}/fundamentals/earnings/${symbol}`)
  return response.data
}

export const getExchangeRate = async (from_currency: string, to_currency: string): Promise<ExchangeRate> => {
  const response = await axios.get(`${API_URL}/forex/exchange/${from_currency}/${to_currency}`)
  return response.data
}

export const getCryptoData = async (symbol: string, market: string): Promise<CryptoData[]> => {
  const response = await axios.get(`${API_URL}/crypto/${symbol}/${market}`)
  return response.data
}

export const getCommodityData = async (function_name: string, interval: 'daily' | 'weekly' | 'monthly'): Promise<CommodityData[]> => {
  const response = await axios.get(`${API_URL}/commodities/${function_name}/${interval}`)
  return response.data
}

export const getEconomicIndicator = async (function_name: string): Promise<EconomicIndicator[]> => {
  const response = await axios.get(`${API_URL}/economic/${function_name}`)
  return response.data
}

export const getTechnicalIndicator = async (function_name: string, symbol: string, interval: string, time_period: number): Promise<TechnicalIndicator[]> => {
  const response = await axios.get(`${API_URL}/technical/${function_name}/${symbol}?interval=${interval}&time_period=${time_period}`)
  return response.data
}

export const searchSymbols = async (keywords: string): Promise<SearchResult[]> => {
  const response = await axios.get(`${API_URL}/search/${keywords}`)
  return response.data
}

export const getWatchlist = async (): Promise<Stock[]> => {
  return [
    { symbol: 'AAPL', price: 150, volume: 1000000, timestamp: '2025-05-07', change: 1.5 },
    { symbol: 'GOOGL', price: 2800, volume: 500000, timestamp: '2025-05-07', change: -0.8 },
  ]
}