import axios from 'axios'

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY
const BASE_URL = 'https://www.alphavantage.co/query'

// Core Stock Data Types
export interface Stock {
  symbol: string
  price: number
  volume: number
  timestamp: string
}

export interface HistoricalData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface IntradayData {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// Options Data Types
export interface Option {
  symbol: string
  expiration_date: string
  strike: number
  type: string
  last_price: number
}

// Fundamental Data Types
export interface CompanyOverview {
  symbol: string
  name: string
  description: string
  exchange: string
  market_cap: number
}

export interface IncomeStatement {
  fiscal_date_ending: string
  total_revenue: number
  net_income: number
}

export interface BalanceSheet {
  fiscal_date_ending: string
  total_assets: number
  total_liabilities: number
}

export interface CashFlow {
  fiscal_date_ending: string
  operating_cash_flow: number
  capital_expenditure: number
}

export interface Earnings {
  fiscal_date_ending: string
  reported_eps: number
}

// Forex and Crypto Types
export interface ExchangeRate {
  from_currency: string
  to_currency: string
  exchange_rate: number
}

export interface CryptoData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

// Commodities Types
export interface CommodityData {
  date: string
  value: number
}

// Economic Indicators Types
export interface EconomicIndicator {
  date: string
  value: number
}

// Technical Indicators Types
export interface TechnicalIndicator {
  date: string
  value: number
}

// Search Types
export interface SearchResult {
  symbol: string
  name: string
  type: string
  region: string
}

// Core Stock Data APIs
export const fetchStockQuote = async (symbol: string): Promise<Stock> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'GLOBAL_QUOTE', symbol, apikey: API_KEY },
  })
  const data = response.data['Global Quote']
  if (!data || !data['01. symbol']) throw new Error('Invalid symbol or no data')
  return {
    symbol: data['01. symbol'],
    price: parseFloat(data['05. price']),
    volume: parseInt(data['06. volume']),
    timestamp: data['07. latest trading day'],
  }
}

export const fetchHistoricalData = async (symbol: string, outputsize: 'compact' | 'full' = 'compact'): Promise<HistoricalData[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'TIME_SERIES_DAILY', symbol, outputsize, apikey: API_KEY },
  })
  const timeSeries = response.data['Time Series (Daily)']
  if (!timeSeries) throw new Error('No historical data')
  return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
    date,
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
    volume: parseInt(values['5. volume']),
  }))
}

export const fetchIntradayData = async (symbol: string, interval: '1min' | '5min' | '15min' | '30min' | '60min', outputsize: 'compact' | 'full' = 'compact'): Promise<IntradayData[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'TIME_SERIES_INTRADAY', symbol, interval, outputsize, apikey: API_KEY },
  })
  const timeSeries = response.data[`Time Series (${interval})`]
  if (!timeSeries) throw new Error('No intraday data')
  return Object.entries(timeSeries).map(([timestamp, values]: [string, any]) => ({
    timestamp,
    open: parseFloat(values['1. open']),
    high: parseFloat(values['2. high']),
    low: parseFloat(values['3. low']),
    close: parseFloat(values['4. close']),
    volume: parseInt(values['5. volume']),
  }))
}

// Options Data APIs
export const fetchOptionsData = async (symbol: string): Promise<Option[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'REALTIME_OPTIONS', symbol, apikey: API_KEY },
  })
  const options = response.data['Option Chain']
  if (!options) throw new Error('No options data')
  return options.map((opt: any) => ({
    symbol: opt.symbol,
    expiration_date: opt.expiration_date,
    strike: parseFloat(opt.strike),
    type: opt.type,
    last_price: parseFloat(opt.last_price),
  }))
}

// Fundamental Data APIs
export const fetchCompanyOverview = async (symbol: string): Promise<CompanyOverview> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'OVERVIEW', symbol, apikey: API_KEY },
  })
  const data = response.data
  if (!data.Symbol) throw new Error('No company overview')
  return {
    symbol: data.Symbol,
    name: data.Name,
    description: data.Description,
    exchange: data.Exchange,
    market_cap: parseInt(data.MarketCapitalization),
  }
}

export const fetchIncomeStatement = async (symbol: string): Promise<IncomeStatement[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'INCOME_STATEMENT', symbol, apikey: API_KEY },
  })
  const reports = response.data.annualReports
  if (!reports) throw new Error('No income statement data')
  return reports.map((report: any) => ({
    fiscal_date_ending: report.fiscalDateEnding,
    total_revenue: parseInt(report.totalRevenue),
    net_income: parseInt(report.netIncome),
  }))
}

export const fetchBalanceSheet = async (symbol: string): Promise<BalanceSheet[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'BALANCE_SHEET', symbol, apikey: API_KEY },
  })
  const reports = response.data.annualReports
  if (!reports) throw new Error('No balance sheet data')
  return reports.map((report: any) => ({
    fiscal_date_ending: report.fiscalDateEnding,
    total_assets: parseInt(report.totalAssets),
    total_liabilities: parseInt(report.totalLiabilities),
  }))
}

export const fetchCashFlow = async (symbol: string): Promise<CashFlow[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'CASH_FLOW', symbol, apikey: API_KEY },
  })
  const reports = response.data.annualReports
  if (!reports) throw new Error('No cash flow data')
  return reports.map((report: any) => ({
    fiscal_date_ending: report.fiscalDateEnding,
    operating_cash_flow: parseInt(report.operatingCashflow),
    capital_expenditure: parseInt(report.capitalExpenditures),
  }))
}

export const fetchEarnings = async (symbol: string): Promise<Earnings[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'EARNINGS', symbol, apikey: API_KEY },
  })
  const reports = response.data.annualEarnings
  if (!reports) throw new Error('No earnings data')
  return reports.map((report: any) => ({
    fiscal_date_ending: report.fiscalDateEnding,
    reported_eps: parseFloat(report.reportedEPS),
  }))
}

// Forex APIs
export const fetchExchangeRate = async (from_currency: string, to_currency: string): Promise<ExchangeRate> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'CURRENCY_EXCHANGE_RATE', from_currency, to_currency, apikey: API_KEY },
  })
  const data = response.data['Realtime Currency Exchange Rate']
  if (!data) throw new Error('No exchange rate data')
  return {
    from_currency: data['1. From_Currency Code'],
    to_currency: data['3. To_Currency Code'],
    exchange_rate: parseFloat(data['5. Exchange Rate']),
  }
}

// Crypto APIs
export const fetchCryptoData = async (symbol: string, market: string): Promise<CryptoData[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'DIGITAL_CURRENCY_DAILY', symbol, market, apikey: API_KEY },
  })
  const timeSeries = response.data['Time Series (Digital Currency Daily)']
  if (!timeSeries) throw new Error('No crypto data')
  return Object.entries(timeSeries).map(([date, values]: [string, any]) => ({
    date,
    open: parseFloat(values['1a. open (USD)']),
    high: parseFloat(values['2a. high (USD)']),
    low: parseFloat(values['3a. low (USD)']),
    close: parseFloat(values['4a. close (USD)']),
    volume: parseInt(values['5. volume']),
  }))
}

// Commodities APIs
export const fetchCommodityData = async (function_name: string, interval: 'daily' | 'weekly' | 'monthly'): Promise<CommodityData[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: function_name, interval, apikey: API_KEY },
  })
  const data = response.data.data
  if (!data) throw new Error('No commodity data')
  return data.map((item: any) => ({
    date: item.date,
    value: parseFloat(item.value),
  }))
}

// Economic Indicators APIs
export const fetchEconomicIndicator = async (function_name: string): Promise<EconomicIndicator[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: function_name, apikey: API_KEY },
  })
  const data = response.data.data
  if (!data) throw new Error('No economic indicator data')
  return data.map((item: any) => ({
    date: item.date,
    value: parseFloat(item.value),
  }))
}

// Technical Indicators APIs
export const fetchTechnicalIndicator = async (function_name: string, symbol: string, interval: string, time_period: number): Promise<TechnicalIndicator[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: function_name, symbol, interval, time_period, apikey: API_KEY },
  })
  const data = response.data[`Technical Analysis: ${function_name}`]
  if (!data) throw new Error('No technical indicator data')
  return Object.entries(data).map(([date, values]: [string, any]) => ({
    date,
    value: parseFloat(values[function_name.toLowerCase()]),
  }))
}

// Search APIs
export const searchSymbols = async (keywords: string): Promise<SearchResult[]> => {
  const response = await axios.get(BASE_URL, {
    params: { function: 'SYMBOL_SEARCH', keywords, apikey: API_KEY },
  })
  const matches = response.data.bestMatches
  if (!matches) throw new Error('No search results')
  return matches.map((match: any) => ({
    symbol: match['1. symbol'],
    name: match['2. name'],
    type: match['3. type'],
    region: match['4. region'],
  }))
}
