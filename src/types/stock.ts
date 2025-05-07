export interface Stock {
  symbol: string
  price: number
  change: number
}

export interface HistoricalData {
  date: string
  price: number
}
