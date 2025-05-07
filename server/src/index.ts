import express from 'express'
import cors from 'cors'
import stockRoutes from './routes/stock'
import optionsRoutes from './routes/options'
import fundamentalRoutes from './routes/fundamental'
import forexRoutes from './routes/forex'
import cryptoRoutes from './routes/crypto'
import commoditiesRoutes from './routes/commodities'
import economicRoutes from './routes/economic'
import technicalRoutes from './routes/technical'
import searchRoutes from './routes/search'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/stocks', stockRoutes)
app.use('/api/options', optionsRoutes)
app.use('/api/fundamentals', fundamentalRoutes)
app.use('/api/forex', forexRoutes)
app.use('/api/crypto', cryptoRoutes)
app.use('/api/commodities', commoditiesRoutes)
app.use('/api/economic', economicRoutes)
app.use('/api/technical', technicalRoutes)
app.use('/api/search', searchRoutes)

app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }))

// Export for Vercel serverless
export default app