import { Router } from 'express'
import { fetchTechnicalIndicator } from '../services/alphaVantage'

const router = Router()

router.get('/:function/:symbol', async (req, res) => {
  try {
    const interval = req.query.interval as string || 'daily'
    const time_period = parseInt(req.query.time_period as string) || 20
    const data = await fetchTechnicalIndicator(req.params.function, req.params.symbol, interval, time_period)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching technical indicator' })
  }
})

export default router
