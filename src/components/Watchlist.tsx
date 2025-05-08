// Watchlist.tsx
import { FC, useEffect } from 'react'
import { useStockStore } from '../store/useStockStore'
import StockCard from './StockCard'

const Watchlist: FC = () => {
  const { watchlist, fetchWatchlist } = useStockStore()

  useEffect(() => {
    fetchWatchlist()
  }, [fetchWatchlist])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6">
      {watchlist.length > 0 ? (
        watchlist.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-400 text-lg font-medium">
            Your watchlist is empty. Add some stocks to track!
          </p>
        </div>
      )}
    </div>
  )
}

export default Watchlist