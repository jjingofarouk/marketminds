import { Router } from 'express'
import { searchSymbols } from '../services/alphaVantage'

const router = Router()

router.get('/:keywords', async (req, res) => {
  try {
    const data = await searchSymbols(req.params.keywords)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching search results' })
  }
})

export default router