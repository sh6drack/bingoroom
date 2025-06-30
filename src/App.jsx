import { useState, useEffect } from 'react'

function App() {
  const [isLive, setIsLive] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  
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

  // About page component
  const AboutPage = () => (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
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
      `}</style>
      <div style={{
        backgroundColor: 'black',
        height: '100vh',
        position: 'relative',
        fontFamily: 'Helvetica, Arial, sans-serif',
        color: 'white'
      }}>
      {/* Left triangle back button */}
      <div 
        onClick={() => setCurrentPage('home')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: '0',
          height: '0',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderRight: '6px solid white',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.borderRightColor = 'rgba(255, 255, 255, 0.7)'
        }}
        onMouseLeave={(e) => {
          e.target.style.borderRightColor = 'white'
        }}>
      </div>
      
      {/* Content area for text - positioned at middle-top right */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '62.5%',
        transform: 'translateX(-50%)',
        maxWidth: '480px',
        textAlign: 'left',
        lineHeight: '1.5',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '13px',
        fontWeight: '400'
      }}>
        <p style={{ 
          margin: '0', 
          color: 'white'
        }}>
          This radio presents the songs that happened to make it through today.
          <br /><br />
          Radio used to decide what was worth hearing. Now we can dig deeper. We can find the weird stuff, the local stuff, the sets that make you not want to blow your brains out from hearing the 67th rerun of track that's getting promoted.
          <br /><br />
          That's what I think this stuff is about. Playing what moves us, not what's supposed to move you. Turn it up or turn it off. Both are valid.
          <br /><br />
          What sounds profound at 3am might sound ridiculous at noon. Both observations are correct. A love song, a field recording of traffic, someone's first attempt at making beats on their laptop - they all exist in the same space.
          <br /><br />
          Your taste isn't universal. Neither is mine. But something got played today anyway.
        </p>
      </div>
      
      {/* Signature at bottom center */}
      <a 
        href="https://shadrackannor.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '9px',
          color: 'rgba(255, 165, 0, 0.6)',
          letterSpacing: '0.3px',
          fontWeight: '300',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'opacity 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '0.8'
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '0.6'
        }}>
        by shadrack annor
      </a>
    </div>
    </>
  )

  // Render about page if currentPage is 'about'
  if (currentPage === 'about') {
    return <AboutPage />
  }

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
        
        @keyframes subtleFloat {
          0% { 
            transform: translate(0, 0) rotate(0deg);
          }
          25% { 
            transform: translate(2px, -2px) rotate(0.5deg);
          }
          50% { 
            transform: translate(0, -3px) rotate(0deg);
          }
          75% { 
            transform: translate(-2px, -1px) rotate(-0.5deg);
          }
          100% { 
            transform: translate(0, 0) rotate(0deg);
          }
        }
        
        @keyframes offlineFlash {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes aboutFlash {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        
        .about-button {
          cursor: pointer;
        }
        
        .live-dot {
          animation: ${isLive ? 'flash 1s infinite' : 'none'};
        }
        
        .live-text {
          animation: ${isLive ? 'flash 1s infinite' : 'none'};
        }
        
        .main-title {
          animation: ${isLive ? 'flash 1s infinite' : 'subtleFloat 8s ease-in-out infinite'};
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
        fontFamily: 'Helvetica, Arial, sans-serif',
        color: 'white'
      }}>
        
        {/* Minimal offline indicator */}
        {!isLive && (
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '10px',
            letterSpacing: '1px',
            animation: 'offlineFlash 1.5s infinite'
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
          BINGO ROOM
        </h1>
        
        {/* About section - bottom left */}
        <div 
          className="about-button"
          onClick={() => setCurrentPage('about')}
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            fontSize: '12px',
            letterSpacing: '1px',
            color: 'rgba(255, 165, 0, 0.7)',
            fontWeight: 'bold',
            animation: 'offlineFlash 1.5s infinite'
          }}>
          ABOUT
        </div>
      </div>
    </>
  )
}

export default App