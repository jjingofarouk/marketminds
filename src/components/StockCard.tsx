// StockCard.tsx
import { FC } from 'react'
import { Stock } from '../types/stock'

interface StockCardProps {
  stock: Stock
}

const StockCard: FC<StockCardProps> = ({ stock }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-3">{stock.symbol}</h3>
      <div className="space-y-2">
        <p className="text-gray-300 flex justify-between">
          <span className="font-medium">Price:</span>
          <span className="text-white">${stock.price.toFixed(2)}</span>
        </p>
        <p
          className={`flex justify-between font-medium ${
            stock.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}
        >
          <span>Change:</span>
          <span>{stock.change.toFixed(2)}%</span>
        </p>
      </div>
      <div
        className={`mt-4 h-1 rounded-full ${
          stock.change >= 0
            ? 'bg-gradient-to-r from-green-500 to-green-400'
            : 'bg-gradient-to-r from-red-500 to-red-400'
        }`}
      />
    </div>
  )
}

export default StockCard