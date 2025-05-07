import { FC, useState, useEffect } from 'react'
import Watchlist from 'components/Watchlist'
import Chart from 'components/Chart'
import { useStockStore } from 'store/useStockStore'
import { HistoricalData, Stock, IntradayData, Option, CompanyOverview, IncomeStatement, BalanceSheet, CashFlow, Earnings, ExchangeRate, CryptoData, CommodityData, EconomicIndicator, TechnicalIndicator, SearchResult } from 'types/stock'

const Dashboard: FC = () => {
  const {
    stocks, fetchStocks, fetchHistoricalData, fetchIntradayData, getOptions,
    getCompanyOverview, getIncomeStatement, getBalanceSheet, getCashFlow,
    getEarnings, getExchangeRate, getCryptoData, getCommodityData,
    getEconomicIndicator, getTechnicalIndicator, searchSymbols
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">MarketMind Dashboard</h1>
      <div className="mb-6">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter symbol (e.g., AAPL)"
          className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Fetch Data
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search symbols (e.g., Apple)"
          className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleSymbolSearch}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Search Symbols
        </button>
      </div>
      <Watchlist />
      {historicalData.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Historical Data</h2>
          <Chart data={historicalData} />
        </div>
      )}
      {intradayData.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Intraday Data</h2>
          <Chart data={intradayData.map(d => ({ date: d.timestamp, close: d.close, open: d.open, high: d.high, low: d.low, volume: d.volume }))} />
        </div>
      )}
      {options.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Options</h2>
          <ul>
            {options.map((opt, i) => (
              <li key={i}>
                {opt.type} - Strike: ${opt.strike}, Last Price: ${opt.last_price}, Expires: {opt.expiration_date}
              </li>
            ))}
          </ul>
        </div>
      )}
      {overview && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Company Overview</h2>
          <p>Name: {overview.name}</p>
          <p>Exchange: {overview.exchange}</p>
          <p>Market Cap: ${overview.market_cap.toLocaleString()}</p>
        </div>
      )}
      {income.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Income Statement</h2>
          <ul>
            {income.map((inc, i) => (
              <li key={i}>
                {inc.fiscal_date_ending}: Revenue ${inc.total_revenue.toLocaleString()}, Net Income ${inc.net_income.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      {balance.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Balance Sheet</h2>
          <ul>
            {balance.map((bal, i) => (
              <li key={i}>
                {bal.fiscal_date_ending}: Assets ${bal.total_assets.toLocaleString()}, Liabilities ${bal.total_liabilities.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      {cashFlow.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Cash Flow</h2>
          <ul>
            {cashFlow.map((cf, i) => (
              <li key={i}>
                {cf.fiscal_date_ending}: Operating Cash Flow ${cf.operating_cash_flow.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
      {earnings.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Earnings</h2>
          <ul>
            {earnings.map((earn, i) => (
              <li key={i}>
                {earn.fiscal_date_ending}: EPS ${earn.reported_eps}
              </li>
            ))}
          </ul>
        </div>
      )}
      {exchangeRate && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Exchange Rate (USD/EUR)</h2>
          <p>Rate: {exchangeRate.exchange_rate}</p>
        </div>
      )}
      {cryptoData.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Crypto Data (BTC/USD)</h2>
          <Chart data={cryptoData} />
        </div>
      )}
      {commodityData.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Commodity Data (WTI)</h2>
          <ul>
            {commodityData.map((comm, i) => (
              <li key={i}>
                {comm.date}: ${comm.value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {economicData.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Economic Indicator (Real GDP)</h2>
          <ul>
            {economicData.map((econ, i) => (
              <li key={i}>
                {econ.date}: {econ.value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {technicalData.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Technical Indicator (SMA)</h2>
          <ul>
            {technicalData.map((tech, i) => (
              <li key={i}>
                {tech.date}: {tech.value}
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <ul>
            {searchResults.map((result, i) => (
              <li key={i}>
                {result.name} ({result.symbol}) - {result.type}, {result.region}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dashboard
