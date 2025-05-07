# MarketMind

MarketMind is a real-time stock market dashboard that displays live stock data and provides AI-powered price predictions. Built with React, TypeScript, FastAPI, TensorFlow, and WebSockets. It delivers seamless data streaming, predictive analytics, and a clean interactive UI for retail investors and analysts.

## Features

- Live stock market price updates
- AI-driven short-term price predictions
- Interactive charts and visualizations
- WebSocket-based real-time data pipeline
- Search and track multiple stocks
- Historical price data visualization
- Authentication and user dashboards
- Light/dark mode toggle
- Mobile-responsive design

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Recharts / Chart.js
- Zustand (state management)
- WebSocket client
- Axios

### Backend
- FastAPI
- Python 3.11+
- WebSockets (via FastAPI)
- REST API for static/historical data
- yfinance for stock data
- SQLModel + SQLite/PostgreSQL
- TensorFlow (model serving)
- Celery + Redis (optional for async tasks)

### Machine Learning
- TensorFlow (LSTM or GRU for time series)
- Scikit-learn
- Pandas, NumPy
- Custom preprocessing pipeline

## Directory Structure

marketmind/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── stocks.py
│   │   │   │   ├── users.py
│   │   │   ├── websocket/
│   │   │   │   └── live_feed.py
│   │   ├── models/
│   │   │   ├── stock.py
│   │   │   ├── user.py
│   │   ├── services/
│   │   │   ├── fetcher.py
│   │   │   ├── predictor.py
│   │   ├── db/
│   │   │   ├── session.py
│   │   │   ├── init_db.py
│   │   ├── utils/
│   │   │   ├── preprocessing.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   └── tasks/
│   │       └── worker.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StockCard.tsx
│   │   │   ├── Chart.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Navbar.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   ├── store/
│   │   │   └── useStockStore.ts
│   │   ├── utils/
│   │   │   ├── api.ts
│   │   │   └── ws.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── ml/
│   ├── model/
│   │   ├── train_model.py
│   │   ├── evaluate.py
│   │   └── predict.py
│   ├── data/
│   │   ├── fetch_data.py
│   │   └── preprocess.py
│   ├── saved_models/
│   └── requirements.txt
│
├── docker-compose.yml
└── README.md

## Setup Instructions

### Prerequisites
- Node.js v18+
- Python 3.11+
- Docker & Docker Compose (recommended)
- Firebase (optional for auth)
- Redis (for Celery tasks)

### 1. Clone the Repo
```bash
git clone https://github.com/jjingofarouk/marketmind.git
cd marketmind

2. Start the Backend

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

3. Start the Frontend

cd frontend
npm install
npm run dev

4. Start with Docker (recommended)

docker-compose up --build

API Routes

	•	GET /api/stocks/{symbol} – Get current data
	•	GET /api/stocks/{symbol}/history – Get historical prices
	•	POST /api/users/login – User login
	•	GET /ws/stocks – WebSocket for live updates

WebSocket Example

const socket = new WebSocket("ws://localhost:8000/ws/stocks");
socket.onmessage = (msg) => {
  const data = JSON.parse(msg.data);
  updateChart(data);
};

Model Training

cd ml/model
python train_model.py

Trained models are saved to ml/saved_models/ and served by FastAPI in the backend.

Screenshots

License

MIT License

Author

Built by [Farouk Jjingo] – jjingofarouk.xyz

