import { FC } from 'react'
import Link from 'next/link'
import Button from '../components/common/Button'

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6">
          MarketMind Enterprise
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
          Empower your financial strategy with real-time market intelligence, advanced analytics, and AI-driven predictive insights tailored for enterprise success.
        </p>
        <Link href="/dashboard">
          <Button
            variant="primary"
            size="lg"
            className="group relative overflow-hidden px-8 py-4 text-lg font-semibold"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            Explore Dashboard
          </Button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl">
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-green-400 mb-2">Real-Time Data</h3>
          <p className="text-gray-400">
            Access live stock, crypto, and commodity data with unparalleled accuracy.
          </p>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-green-400 mb-2">AI Predictions</h3>
          <p className="text-gray-400">
            Leverage machine learning for precise market forecasts and strategic insights.
          </p>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-green-400 mb-2">Enterprise Scale</h3>
          <p className="text-gray-400">
            Robust APIs and analytics tools designed for institutional-grade performance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home