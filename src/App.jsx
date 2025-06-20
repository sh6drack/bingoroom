import { useState } from 'react'

function App() {
  const [isLive, setIsLive] = useState(false)

  return (
    <div style={{
      backgroundColor: 'black',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Helvetica, Arial, sans-serif',
      color: 'white'
    }}>
      
      {/* Live indicator dot */}
      <div style={{
        position: 'absolute',
        top: '30px',
        right: '30px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: isLive ? 'red' : '#666',
          animation: isLive ? 'flash 1s infinite' : 'none'
        }}></div>
        <span style={{
          fontSize: '14px',
          fontWeight: 'bold',
          letterSpacing: '2px'
        }}>
          {isLive ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>

      {/* Main title */}
      <h1 style={{
        fontSize: '8rem',
        fontWeight: '900',
        margin: '0',
        textAlign: 'center',
        lineHeight: '0.9'
      }}>
        BINGO ROOM<br />RADIO
      </h1>

      <style jsx>{`
        @keyframes flash {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default App