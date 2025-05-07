import { Router } from 'express'
import { fetchOptionsData } from '../services/alphaVantage'

const router = Router()

router.get('/:symbol', async (req, res) => {
  try {
    const data = await fetchOptionsData(req.params.symbol)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching options data' })
  }
})

export default router
