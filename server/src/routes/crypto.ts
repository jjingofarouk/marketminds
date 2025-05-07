import { Router } from 'express'
import { fetchCryptoData } from '../services/alphaVantage'

const router = Router()

router.get('/:symbol/:market', async (req, res) => {
  try {
    const data = await fetchCryptoData(req.params.symbol, req.params.market)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching crypto data' })
  }
})

export default router
