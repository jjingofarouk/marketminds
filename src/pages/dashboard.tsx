import { FC, useState, useEffect } from 'react'
import Watchlist from '../components/Watchlist'
import Chart from '../components/Chart'
import PredictionBox from '../components/PredictionBox'
import { useStockStore } from '../store/useStockStore'
import { HistoricalData, Stock } from '../types/stock'
import { Prediction } from '../types/prediction'

const Dashboard: FC = () => {
  const { stocks, fetchStocks, fetchHistoricalData, fetchPrediction } = useStockStore()
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([])
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [symbol, setSymbol] = useState('')

  useEffect(() => {
    fetchStocks('AAPL')
  }, [fetchStocks])

  const handleSearch = async () => {
    try {
      const data = await fetchHistoricalData(symbol)
      const pred = await fetchPrediction(symbol)
      setHistoricalData(data)
      setPrediction(pred)
    } catch (error) {
      console.error('Error searching stock:', error)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-6">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Search
        </button>
      </div>
      <Watchlist />
      {historicalData.length > 0 && <Chart data={historicalData} />}
      {prediction && <PredictionBox prediction={prediction} />}
    </div>
  )
}

export default Dashboard