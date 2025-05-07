import { FC } from 'react'
import { Prediction } from '../types/prediction'

interface PredictionBoxProps {
  prediction: Prediction
}

const PredictionBox: FC<PredictionBoxProps> = ({ prediction }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold">Price Prediction</h3>
      <p className="text-gray-600 dark:text-gray-300">Symbol: {prediction.symbol}</p>
      <p className="text-gray-600 dark:text-gray-300">Predicted Price: ${prediction.predicted_price.toFixed(2)}</p>
      <p className="text-gray-600 dark:text-gray-300">Confidence: {(prediction.confidence * 100).toFixed(2)}%</p>
    </div>
  )
}

export default PredictionBox
