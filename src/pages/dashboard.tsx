import { FC, useState, useEffect } from 'react'
import Watchlist from '../components/Watchlist'
import Chart from '../components/Chart'
import Button from '../components/common/Button'
import { useStockStore } from '../store/useStockStore'
import {
  HistoricalData,
  Stock,
  IntradayData,
  Option,
  CompanyOverview,
  IncomeStatement,
  BalanceSheet,
  CashFlow,
  Earnings,
  ExchangeRate,
  CryptoData,
  CommodityData,
  EconomicIndicator,
  TechnicalIndicator,
  SearchResult,
} from '../types/stock'

const Dashboard: FC = () => {
  const {
    stocks,
    fetchStocks,
    fetchHistoricalData,
    fetchIntradayData,
    getOptions,
    getCompanyOverview,
    getIncomeStatement,
    getBalanceSheet,
    getCashFlow,
    getEarnings,
    getExchangeRate,
    getCryptoData,
    getCommodityData,
    getEconomicIndicator,
    getTechnicalIndicator,
    searchSymbols,
  } = useStockStore()

  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [intradayData, setIntradayData] = useState<IntradayData[]>([])
  const [options, setOptions] = useState<Option[]>([])
  const [overview, setOverview] = useState<CompanyOverview | null>(null)
  const [income, setIncome] = useState<IncomeStatement[]>([])
  const [balance, setBalance] = useState<BalanceSheet[]>([])
  const [cashFlow, setCashFlow] = useState<CashFlow[]>([])
  const [earnings, setEarnings] = useState<Earnings[]>([])
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null)
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [commodityData, setCommodityData] = useState<CommodityData[]>([])
  const [economicData, setEconomicData] = useState<EconomicIndicator[]>([])
  const [technicalData, setTechnicalData] = useState<TechnicalIndicator[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [symbol, setSymbol] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchStocks('AAPL')
  }, [fetchStocks])

  const handleSearch = async () => {
    try {
      const [hist, intra, opts, ov, inc, bal, cf, earn, rate, crypto, comm, econ, tech] = await Promise.all([
        fetchHistoricalData(symbol),
        fetchIntradayData(symbol, '1min'),
        getOptions(symbol),
        getCompanyOverview(symbol),
        getIncomeStatement(symbol),
        getBalanceSheet(symbol),
        getCashFlow(symbol),
        getEarnings(symbol),
        getExchangeRate('USD', 'EUR'),
        getCryptoData('BTC', 'USD'),
        getCommodityData('WTI', 'monthly'),
        getEconomicIndicator('REAL_GDP'),
        getTechnicalIndicator('SMA', symbol, 'daily', 20),
      ])
      setHistoricalData(hist)
      setIntradayData(intra)
      setOptions(opts)
      setOverview(ov)
      setIncome(inc)
      setBalance(bal)
      setCashFlow(cf)
      setEarnings(earn)
      setExchangeRate(rate)
      setCryptoData(crypto)
      setCommodityData(comm)
      setEconomicData(econ)
      setTechnicalData(tech)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSymbolSearch = async () => {
    try {
      const results = await searchSymbols(searchQuery)
      setSearchResults(results)
    } catch (error) {
      console.error('Error searching symbols:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-8">
          MarketMind Dashboard
        </h1>

        {/* Search Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="Enter symbol (e.g., AAPL)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
            <Button
              onClick={handleSearch}
              variant="primary"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Fetch Data
            </Button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search symbols (e.g., Apple)"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            />
            <Button
              onClick={handleSymbolSearch}
              variant="primary"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              Search Symbols
            </Button>
          </div>
        </div>

        {/* Watchlist */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">Watchlist</h2>
          <Watchlist />
        </section>

        {/* Data Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {historicalData.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Historical Data</h2>
              <Chart data={historicalData} />
            </section>
          )}
          {intradayData.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Intraday Data</h2>
              <Chart
                data={intradayData.map((d) => ({
                  date: d.timestamp,
                  close: d.close,
                  open: d.open,
                  high: d.high,
                  low: d.low,
                  volume: d.volume,
                }))}
              />
            </section>
          )}
        </div>

        {/* Financial Data Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {overview && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Company Overview</h2>
              <div className="space-y-2 text-gray-300">
                <p>
                  <span className="font-medium">Name:</span> {overview.name}
                </p>
                <p>
                  <span className="font-medium">Exchange:</span> {overview.exchange}
                </p>
                <p>
                  <span className="font-medium">Market Cap:</span> ${overview.market_cap.toLocaleString()}
                </p>
              </div>
            </section>
          )}
          {options.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Options</h2>
              <ul className="space-y-2 text-gray-300">
                {options.slice(0, 5).map((opt, i) => (
                  <li key={i} className="truncate">
                    {opt.type} - Strike: ${opt.strike}, Last: ${opt.last_price}, Expires: {opt.expiration_date}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {income.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Income Statement</h2>
              <ul className="space-y-2 text-gray-300">
                {income.slice(0, 3).map((inc, i) => (
                  <li key={i}>
                    {inc.fiscal_date_ending}: Revenue ${inc.total_revenue.toLocaleString()}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {balance.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Balance Sheet</h2>
              <ul className="space-y-2 text-gray-300">
                {balance.slice(0, 3).map((bal, i) => (
                  <li key={i}>
                    {bal.fiscal_date_ending}: Assets ${bal.total_assets.toLocaleString()}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {cashFlow.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Cash Flow</h2>
              <ul className="space-y-2 text-gray-300">
                {cashFlow.slice(0, 3).map((cf, i) => (
                  <li key={i}>
                    {cf.fiscal_date_ending}: Operating ${cf.operating_cash_flow.toLocaleString()}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {earnings.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Earnings</h2>
              <ul className="space-y-2 text-gray-300">
                {earnings.slice(0, 3).map((earn, i) => (
                  <li key={i}>
                    {earn.fiscal_date_ending}: EPS ${earn.reported_eps}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Additional Data Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {exchangeRate && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Exchange Rate (USD/EUR)</h2>
              <p className="text-gray-300">Rate: {exchangeRate.exchange_rate}</p>
            </section>
          )}
          {cryptoData.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Crypto Data (BTC/USD)</h2>
              <Chart data={cryptoData} />
            </section>
          )}
          {commodityData.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Commodity Data (WTI)</h2>
              <ul className="space-y-2 text-gray-300">
                {commodityData.slice(0, 3).map((comm, i) => (
                  <li key={i}>
                    {comm.date}: ${comm.value}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {economicData.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Economic Indicator (Real GDP)</h2>
              <ul className="space-y-2 text-gray-300">
                {economicData.slice(0, 3).map((econ, i) => (
                  <li key={i}>
                    {econ.date}: {econ.value}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {technicalData.length > 0 && (
            <section className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold text-green-400 mb-4">Technical Indicator (SMA)</h2>
              <ul className="space-y-2 text-gray-300">
                {technicalData.slice(0, 3).map((tech, i) => (
                  <li key={i}>
                    {tech.date}: {tech.value}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.slice(0, 6).map((result, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <p className="text-white font-medium">{result.name}</p>
                  <p className="text-gray-400 text-sm">
                    {result.symbol} - {result.type}, {result.region}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default Dashboard