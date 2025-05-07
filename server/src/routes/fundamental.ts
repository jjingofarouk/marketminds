import { Router } from 'express'
import { fetchCompanyOverview, fetchIncomeStatement, fetchBalanceSheet, fetchCashFlow, fetchEarnings } from '../services/alphaVantage'

const router = Router()

router.get('/overview/:symbol', async (req, res) => {
  try {
    const data = await fetchCompanyOverview(req.params.symbol)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching company overview' })
  }
})

router.get('/income/:symbol', async (req, res) => {
  try {
    const data = await fetchIncomeStatement(req.params.symbol)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching income statement' })
  }
})

router.get('/balance/:symbol', async (req, res) => {
  try {
    const data = await fetchBalanceSheet(req.params.symbol)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching balance sheet' })
  }
})

router.get('/cashflow/:symbol', async (req, res) => {
  try {
    const data = await fetchCashFlow(req.params.symbol)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cash flow' })
  }
})

router.get('/earnings/:symbol', async (req, res) => {
  try {
    const data = await fetchEarnings(req.params.symbol)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching earnings' })
  }
})

export default router