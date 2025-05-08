// PredictionBox.tsx
import { FC } from 'react'
import { Prediction } from '../types/prediction'

interface PredictionBoxProps {
  prediction: Prediction
}

const PredictionBox: FC<PredictionBoxProps> = ({ prediction }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700">
      <h3 className="text-xl font-bold text-green-400 mb-3">Price Prediction</h3>
      <div className="space-y-2">
        <p className="text-gray-300 flex justify-between">
          <span className="font-medium">Symbol:</span>
          <span className="text-white">{prediction.symbol}</span>
        </p>
        <p className="text-gray-300 flex justify-between">
          <span className="font-medium">Predicted Price:</span>
          <span className="text-white">${prediction.predicted_price.toFixed(2)}</span>
        </p>
        <p className="text-gray-300 flex justify-between">
          <span className="font-medium">Confidence:</span>
          <span className="text-white">{(prediction.confidence * 100).toFixed(2)}%</span>
        </p>
      </div>
      <div className="mt-4 h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" />
    </div>
  )
}

export default PredictionBox