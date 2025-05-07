import { Router } from 'express'
import { fetchExchangeRate } from '../services/alphaVantage'

const router = Router()

router.get('/exchange/:from/:to', async (req, res) => {
  try {
    const data = await fetchExchangeRate(req.params.from, req.params.to)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exchange rate' })
  }
})

export default router
