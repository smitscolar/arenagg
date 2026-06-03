import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Global error handler for unhandled errors
window.addEventListener('error', (e) => {
  console.error('ArenaGG Error:', e.error)
})
window.addEventListener('unhandledrejection', (e) => {
  console.error('ArenaGG Rejection:', e.reason)
})

// Simple error boundary wrapper for production
class RootErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error) { return { hasError: true, error } }
  componentDidCatch(error, info) { console.error('Root Error:', error, info) }
  render() {
    if (this.state.hasError) {
      return React.createElement('div', {
        style: { minHeight:'100vh', background:'#050508', color:'#e8e8f0', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:'system-ui,sans-serif', textAlign:'center' }
      },
        React.createElement('div', null,
          React.createElement('div', { style:{fontSize:48,marginBottom:16} }, '⚡'),
          React.createElement('div', { style:{fontSize:20,fontWeight:700,color:'#00e5ff',marginBottom:8,letterSpacing:2} }, 'ARENAGG'),
          React.createElement('div', { style:{fontSize:14,color:'#ff2d55',marginBottom:12} }, 'Terjadi kesalahan teknis'),
          React.createElement('div', { style:{fontSize:11,color:'#4a4a6a',marginBottom:20,fontFamily:'monospace',background:'rgba(255,255,255,0.05)',padding:12,borderRadius:6,wordBreak:'break-all'} }, String(this.state.error)),
          React.createElement('button', { onClick:()=>window.location.reload(), style:{background:'#00e5ff',color:'#000',border:'none',padding:'10px 24px',borderRadius:6,cursor:'pointer',fontWeight:700,fontSize:13} }, '🔄 Muat Ulang')
        )
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null,
    React.createElement(RootErrorBoundary, null,
      React.createElement(App, null)
    )
  )
)
