// Add this as a new file: src/AdminPanel.jsx
import { useState, useEffect } from 'react'

function AdminPanel({ onLiveStatusChange, isLive }) {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Simple password protection (in production, use proper authentication)
  const ADMIN_PASSWORD = 'bingoroom2025' // Change this to your preferred password

  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem('adminAuth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }

    // Keyboard shortcut to show admin panel (Ctrl/Cmd + Shift + A)
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'true')
      setPassword('')
    } else {
      alert('Incorrect password')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('adminAuth')
    setIsVisible(false)
  }

  const toggleLiveStatus = () => {
    onLiveStatusChange(!isLive)
  }

  if (!isVisible) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        fontSize: '8px',
        color: 'rgba(255, 255, 255, 0.1)',
        userSelect: 'none',
        pointerEvents: 'none'
      }}>
        Ctrl+Shift+A
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      padding: '20px',
      color: 'white',
      fontFamily: 'Helvetica, Arial, sans-serif',
      zIndex: 1000,
      minWidth: '300px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>Admin Panel</h3>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0'
          }}
        >
          ×
        </button>
      </div>

      {!isAuthenticated ? (
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                color: 'white',
                fontSize: '14px'
              }}
              autoFocus
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'rgba(255, 165, 0, 0.8)',
              border: 'none',
              borderRadius: '4px',
              color: 'black',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </form>
      ) : (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '15px'
            }}>
              <span>Status:</span>
              <span style={{
                color: isLive ? '#ff4444' : '#666',
                fontWeight: 'bold'
              }}>
                {isLive ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>
            
            <button
              onClick={toggleLiveStatus}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: isLive ? '#ff4444' : '#44ff44',
                border: 'none',
                borderRadius: '4px',
                color: 'black',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              {isLive ? 'GO OFFLINE' : 'GO LIVE'}
            </button>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminPanel