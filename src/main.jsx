import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

console.warn("REACT MOUNT TRIGGERED: Attempting to inject into #root", document.getElementById('root'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      {/* <div style={{ position: "fixed", top: 0, left: 0, zIndex: 999999, background: "rgba(255,0,0,0.8)", padding: "10px", color: "white" }}>
        React Mount Status: ACTIVE
      </div> */}
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
