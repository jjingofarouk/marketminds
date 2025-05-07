import { Router } from 'express'
import { fetchCommodityData } from '../services/alphaVantage'

const router = Router()

router.get('/:function/:interval', async (req, res) => {
  try {
    const data = await fetchCommodityData(req.params.function, req.params.interval as 'daily' | 'weekly' | 'monthly')
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching commodity data' })
  }
})

export default router