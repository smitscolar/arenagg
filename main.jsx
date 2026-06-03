import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Global error handler
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error)
})
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled rejection:', e.reason)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
