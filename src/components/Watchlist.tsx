import { FC, useEffect } from 'react'
import { useStockStore } from '../store/useStockStore'
import StockCard from './StockCard'

const Watchlist: FC = () => {
  const { watchlist, fetchWatchlist } = useStockStore()

  useEffect(() => {
    fetchWatchlist()
  }, [fetchWatchlist])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {watchlist.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  )
}

export default Watchlist
