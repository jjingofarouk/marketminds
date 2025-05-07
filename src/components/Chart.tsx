import { FC } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { HistoricalData } from '../types/stock'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface ChartProps {
  data: HistoricalData[]
}

const Chart: FC<ChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Price',
        data: data.map((d) => d.price),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
    ],
  }

  return <Line data={chartData} options={{ responsive: true }} />
}

export default Chart
