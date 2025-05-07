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

export interface Option {
  symbol: string
  expiration_date: string
  strike: number
  type: string
  last_price: number
}

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

export interface CommodityData {
  date: string
  value: number
}

export interface EconomicIndicator {
  date: string
  value: number
}

export interface TechnicalIndicator {
  date: string
  value: number
}

export interface SearchResult {
  symbol: string
  name: string
  type: string
  region: string
}
