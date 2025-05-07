import { FC } from 'react'
import Link from 'next/link'

const Home: FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MarketMind</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Real-time stock market data and AI-powered predictions.
      </p>
      <Link href="/dashboard">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Go to Dashboard
        </button>
      </Link>
    </div>
  )
}

export default Home
