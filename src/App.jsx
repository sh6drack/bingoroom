import { useState, useEffect } from 'react'

function App() {
  const [isLive, setIsLive] = useState(false)
  const [titleLoaded, setTitleLoaded] = useState(false)

  useEffect(() => {
    // Trigger title fade-in after component mounts
    const timer = setTimeout(() => {
      setTitleLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        
        @keyframes flash {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        @keyframes excessiveFlash {
          0% { opacity: 1; }
          25% { opacity: 0.1; }
          50% { opacity: 1; }
          75% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        
        @keyframes fadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(20px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        .live-dot {
          animation: ${isLive ? 'flash 1s infinite' : 'none'};
        }
        
        .live-text {
          animation: ${isLive ? 'flash 1s infinite' : 'none'};
        }
        
        .main-title {
          animation: ${isLive ? 'flash 1s infinite' : 'none'};
        }
        
        .fade-in-title {
          animation: fadeIn 2s ease-out forwards;
        }
        
        .fade-in-live {
          animation: fadeIn 1.5s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
      
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
        
        {/* Live indicator - centered at top */}
        <div 
          className="fade-in-live"
          style={{
            position: 'absolute',
            top: '30px',
            left: '0',
            right: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px'
          }}>
          {/* Left red dot */}
          <div 
            className="live-dot"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: isLive ? 'red' : '#666'
            }}
          ></div>
          
          {/* LIVE/OFFLINE text */}
          <span 
            className="live-text"
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              textAlign: 'center'
            }}>
            {isLive ? 'LIVE' : 'OFFLINE'}
          </span>
          
          {/* Right red dot */}
          <div 
            className="live-dot"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: isLive ? 'red' : '#666'
            }}
          ></div>
        </div>

        {/* Main title */}
        <h1 
          className={`main-title ${titleLoaded ? 'loaded' : ''} ${isLive ? 'live' : ''}`}
          style={{
            fontSize: '8rem',
            fontWeight: '900',
            margin: '0',
            textAlign: 'center',
            lineHeight: '0.9'
          }}>
          BINGO ROOM<br />RADIO
        </h1>

        {/* Test button (remove this later) */}
        <button 
          onClick={() => setIsLive(!isLive)}
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
          Toggle Live Mode
        </button>
      </div>
    </>
  )
}

export default App