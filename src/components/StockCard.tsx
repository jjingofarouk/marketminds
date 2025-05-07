import { FC } from 'react'
import { Stock } from 'types/stock'

interface StockCardProps {
  stock: Stock
}

const StockCard: FC<StockCardProps> = ({ stock }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold">{stock.symbol}</h3>
      <p className="text-gray-600 dark:text-gray-300">Price: ${stock.price.toFixed(2)}</p>
      <p className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        Change: {stock.change.toFixed(2)}%
      </p>
    </div>
  )
}

export default StockCard
