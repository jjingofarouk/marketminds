import { Router } from 'express'
import { fetchEconomicIndicator } from '../services/alphaVantage'

const router = Router()

router.get('/:function', async (req, res) => {
  try {
    const data = await fetchEconomicIndicator(req.params.function)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching economic indicator' })
  }
})

export default router