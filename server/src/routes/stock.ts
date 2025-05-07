import { Router } from 'express'
import { fetchStockQuote, fetchHistoricalData, fetchIntradayData } from '../services/alphaVantage'

const router = Router()

router.get('/quote/:symbol', async (req, res) => {
  try {
    const stock = await fetchStockQuote(req.params.symbol)
    res.json(stock)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stock quote' })
  }
})

router.get('/historical/:symbol', async (req, res) => {
  try {
    const outputsize = req.query.outputsize as 'compact' | 'full' || 'compact'
    const data = await fetchHistoricalData(req.params.symbol, outputsize)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching historical data' })
  }
})

router.get('/intraday/:symbol', async (req, res) => {
  try {
    const interval = req.query.interval as '1min' | '5min' | '15min' | '30min' | '60min' || '1min'
    const outputsize = req.query.outputsize as 'compact' | 'full' || 'compact'
    const data = await fetchIntradayData(req.params.symbol, interval, outputsize)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching intraday data' })
  }
})

export default router
