import { FC } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { HistoricalData } from '../types/stock'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface ChartProps {
  data: HistoricalData[]
  title?: string
}

const Chart: FC<ChartProps> = ({ data, title = 'Stock Price History' }) => {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Price',
        data: data.map((d) => d.close),
        borderColor: 'rgb(34, 197, 94)', // Green for growth
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
          font: {
            size: 14,
            weight: 600 as const, // Changed to numeric value
          },
        },
      },
      title: {
        display: true,
        text: title,
        color: '#e5e7eb',
        font: {
          size: 18,
          weight: 700 as const, // Changed to numeric value
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: { size: 14, weight: 600 as const }, // Changed to numeric value
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          maxTicksLimit: 10,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          callback: (value: number) => `$${value.toFixed(2)}`,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      intersect: false,
    },
    hover: {
      mode: 'nearest' as const,
      intersect: false,
    },
  }

  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg">
      <Line data={chartData} options={options} />
    </div>
  )
}

export default Chart