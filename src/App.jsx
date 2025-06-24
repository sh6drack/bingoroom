import { useState, useEffect } from 'react'

function App() {
  const [isLive, setIsLive] = useState(false)
  
  // Admin-only controls via browser console
  useEffect(() => {
    // Make toggle function available in console
    window.toggleLive = () => {
      setIsLive(prev => !prev)
      console.log('Live status:', !isLive ? 'LIVE' : 'OFFLINE')
    }
    
    // Clean up on unmount
    return () => {
      delete window.toggleLive
    }
  }, [isLive])
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
        
        .fade-in-main-title {
          animation: fadeIn 2.5s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .fade-in-main-title.loaded {
          animation: ${isLive ? 'flash 1s infinite' : 'fadeIn 2.5s ease-out 0.5s forwards'};
        }
        
        /* Mobile responsive font sizes */
        @media (max-width: 768px) {
          .main-title {
            font-size: 3rem !important;
          }
          .live-text {
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .main-title {
            font-size: 2.5rem !important;
          }
          .live-text {
            font-size: 10px !important;
          }
        }
        
        @media (max-width: 320px) {
          .main-title {
            font-size: 2rem !important;
          }
          .live-text {
            font-size: 9px !important;
          }
        }
      `}</style>
      
      <div style={{
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Courier New", "Monaco", "Menlo", monospace',
        color: 'white'
      }}>
        
        {/* Minimal offline indicator */}
        {!isLive && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '10px',
            opacity: 0.3,
            letterSpacing: '1px'
          }}>
            OFFLINE
          </div>
        )}
        
        {/* Live indicator - centered at top */}
        {isLive && (
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
                backgroundColor: 'red'
              }}
            ></div>
            
            {/* LIVE text */}
            <span 
              className="live-text"
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '2px',
                textAlign: 'center'
              }}>
              LIVE
            </span>
            
            {/* Right red dot */}
            <div 
              className="live-dot"
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: 'red'
              }}
            ></div>
          </div>
        )}

        {/* Main title */}
        <h1 
          className={`main-title fade-in-main-title ${titleLoaded ? 'loaded' : ''}`}
          style={{
            fontSize: '8rem',
            fontWeight: '900',
            margin: '0',
            textAlign: 'center',
            lineHeight: '0.9'
          }}>
          BINGO ROOM<br />RADIO
        </h1>
      </div>
    </>
  )
}

export default App