import ReactDOM from 'react-dom/client'
import HomePage from '@pages/HomePage'
import './index.css'

function App() {
  return <HomePage />
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
