import { useState, useEffect } from 'react'

function App() {
  const [isLive, setIsLive] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [titleLoaded, setTitleLoaded] = useState(false)

  // Admin-only controls via browser console
  useEffect(() => {
    window.toggleLive = () => {
      setIsLive(prev => !prev)
      console.log('Live status:', !isLive ? 'LIVE' : 'OFFLINE')
    }
    return () => {
      delete window.toggleLive
    }
  }, [isLive])

  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // About page component
  const AboutPage = () => {
    const [aboutLoaded, setAboutLoaded] = useState(false)
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setAboutLoaded(true)
      }, 100)
      return () => clearTimeout(timer)
    }, [])
    
    return (
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
          min-height: 100%;
          overflow: auto;
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateX(-50%) translateY(20px);
          }
          100% { 
            opacity: 1; 
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @keyframes offlineFlash {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .about-fade-in {
          animation: fadeInUp 1.5s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .about-fade-in-content {
          animation: fadeInUp 2.5s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .about-fade-in-signature {
          animation: fadeInUp 1.5s ease-out 0.2s forwards;
          opacity: 0;
        }
      `}</style>
      <div style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        position: 'relative',
        fontFamily: 'Akzidenz-Grotesk, Helvetica, Arial, sans-serif',
        color: 'white',
        paddingBottom: '60px'
      }}>
      {/* Live indicator for about page - top right */}
      {isLive && (
        <div 
          className="about-fade-in"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
          <span 
            style={{
              fontSize: '10px',
              letterSpacing: '1px',
              animation: 'offlineFlash 1.5s infinite'
            }}>
            LIVE
          </span>
          <div 
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'red',
              animation: 'offlineFlash 1.5s infinite'
            }}>
          </div>
        </div>
      )}
      
      {/* Offline indicator for about page */}
      {!isLive && (
        <div 
          className="about-fade-in"
          style={{
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
      
      {/* Left triangle back button */}
      <div 
        className="about-fade-in"
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
      
      {/* Content area for text - positioned at center */}
      <div 
        className="about-fade-in-content"
        style={{
          position: 'absolute',
          top: '25%',
          left: '62.5%',
          transform: 'translateX(-50%) translateY(20px)',
          maxWidth: '480px',
          textAlign: 'left',
          lineHeight: '1.5',
          fontFamily: 'Akzidenz-Grotesk, Helvetica, Arial, sans-serif',
          fontSize: '13px',
          fontWeight: '400'
        }}>
        <p style={{ 
          margin: '0', 
          color: 'white'
        }}>
          This radio presents the songs that happened to make it through today.
          <br /><br />
          Radio used to decide what was worth hearing. Now we can dig deeper. We can find the weird stuff, the local stuff, the sets that make you not want to blow your brains out from hearing the 67th rerun of a track that's getting promoted.
          <br /><br />
          That's what I think this stuff is about. Playing what moves us, not what's supposed to move you. Turn it up or turn it off. Both are valid.
          <br /><br />
          What sounds profound at 3am might sound ridiculous at noon. Both observations are correct. A love song, a field recording of traffic, someone's first attempt at making beats on their laptop - they all exist in the same space.
          <br /><br />
          Your taste isn't universal. Neither is mine. But something got played today anyway.
        </p>
      </div>
      
      {/* Signature at bottom right */}
      <a 
        href="https://shadrackannor.com"
        target="_blank"
        rel="noopener noreferrer"
        className="about-fade-in-signature"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '12px',
          color: 'rgba(255, 165, 0, 0.4)',
          letterSpacing: '1px',
          fontWeight: 'normal',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'opacity 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '0.6'
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '0.4'
        }}>
        by shadrack annor
      </a>
    </div>
    </>
    )
  }

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
          overflow: auto;
        }
        
        @keyframes flash {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
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
        
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        
        .main-title {
          animation: subtleFloat 8s ease-in-out infinite;
        }
        
        .fade-in-main-title {
          animation: fadeIn 2.5s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .fade-in-main-title.loaded {
          animation: fadeIn 2.5s ease-out 0.5s forwards;
        }
        
        /* Mobile responsive font sizes */
        @media (max-width: 768px) {
          .main-title {
            font-size: 3rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .main-title {
            font-size: 2.5rem !important;
          }
        }
        
        @media (max-width: 320px) {
          .main-title {
            font-size: 2rem !important;
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
        fontFamily: 'Akzidenz-Grotesk, Helvetica, Arial, sans-serif',
        color: 'white',
        position: 'relative'
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
        
        {/* Live indicator - top right like offline */}
        {isLive && (
          <div 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'fadeIn 1.5s ease-out 0.2s forwards',
              opacity: 0
            }}>
            <span 
              style={{
                fontSize: '10px',
                letterSpacing: '1px',
                animation: 'offlineFlash 1.5s infinite'
              }}>
              LIVE
            </span>
            <div 
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'red',
                animation: 'offlineFlash 1.5s infinite'
              }}
            ></div>
          </div>
        )}

        {/* CSS Animated Paper Fishing Drawing */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '200px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            zIndex: 10,
            animation: 'fadeIn 2s ease-out 0.5s forwards',
            opacity: 0
          }}
        >
          <svg width="280" height="180" viewBox="0 0 280 180" style={{ overflow: 'visible' }}>
            {/* Boat */}
            <path
              d="M 40 110 Q 70 120 140 120 Q 210 120 240 110 L 230 130 Q 140 135 50 130 Z"
              fill="none"
              stroke="#333"
              strokeWidth="2"
              strokeDasharray="300"
              strokeDashoffset="300"
              style={{ animation: 'drawLine 2s ease-out 1s forwards' }}
            />
            
            {/* Water lines */}
            <path
              d="M 0 130 Q 20 135 40 130 Q 60 125 80 130 Q 100 135 120 130 Q 140 125 160 130 Q 180 135 200 130 Q 220 125 240 130 Q 260 135 280 130"
              fill="none"
              stroke="#666"
              strokeWidth="1"
              strokeDasharray="400"
              strokeDashoffset="400"
              style={{ animation: 'drawLine 2s ease-out 2s forwards' }}
            />
            
            {/* Stick figure - head */}
            <circle
              cx="120"
              cy="70"
              r="10"
              fill="none"
              stroke="#333"
              strokeWidth="2"
              style={{ animation: 'fadeIn 0.5s ease-out 2.5s forwards', opacity: 0 }}
            />
            
            {/* Eyes and mouth */}
            <circle cx="117" cy="68" r="1" fill="#333" style={{ animation: 'fadeIn 0.5s ease-out 3s forwards', opacity: 0 }} />
            <circle cx="123" cy="68" r="1" fill="#333" style={{ animation: 'fadeIn 0.5s ease-out 3.1s forwards', opacity: 0 }} />
            <path d="M 117 73 Q 120 75 123 73" fill="none" stroke="#333" strokeWidth="1" style={{ animation: 'fadeIn 0.5s ease-out 3.2s forwards', opacity: 0 }} />
            
            {/* Body */}
            <line x1="120" y1="80" x2="120" y2="110" stroke="#333" strokeWidth="2" 
              strokeDasharray="30" strokeDashoffset="30" style={{ animation: 'drawLine 1s ease-out 3.5s forwards' }} />
            
            {/* Arms */}
            <line x1="120" y1="90" x2="105" y2="95" stroke="#333" strokeWidth="2"
              strokeDasharray="20" strokeDashoffset="20" style={{ animation: 'drawLine 0.8s ease-out 4s forwards' }} />
            <line x1="120" y1="90" x2="160" y2="85" stroke="#333" strokeWidth="2"
              strokeDasharray="40" strokeDashoffset="40" style={{ animation: 'drawLine 0.8s ease-out 4.2s forwards' }} />
            
            {/* Legs */}
            <line x1="120" y1="110" x2="115" y2="125" stroke="#333" strokeWidth="2"
              strokeDasharray="15" strokeDashoffset="15" style={{ animation: 'drawLine 0.8s ease-out 4.5s forwards' }} />
            <line x1="120" y1="110" x2="125" y2="125" stroke="#333" strokeWidth="2"
              strokeDasharray="15" strokeDashoffset="15" style={{ animation: 'drawLine 0.8s ease-out 4.7s forwards' }} />
            
            {/* Fishing rod */}
            <line x1="160" y1="85" x2="185" y2="55" stroke="#654321" strokeWidth="3"
              strokeDasharray="35" strokeDashoffset="35" style={{ animation: 'drawLine 1s ease-out 5s forwards' }} />
            
            {/* Fishing line */}
            <path d="M 185 55 Q 195 75 205 95 Q 215 115 225 130" fill="none" stroke="#333" strokeWidth="1"
              strokeDasharray="80" strokeDashoffset="80" style={{ animation: 'drawLine 1.5s ease-out 5.5s forwards' }} />
            
            {/* Bingo ball */}
            <g style={{ animation: 'fadeIn 1s ease-out 6.5s forwards, subtleFloat 3s ease-in-out 7s infinite', opacity: 0 }}>
              <circle cx="225" cy="130" r="8" fill="white" stroke="#333" strokeWidth="1" />
              <text x="225" y="133" textAnchor="middle" fontSize="6" fill="#333" fontWeight="bold">B7</text>
            </g>
          </svg>
        </div>
        
        {/* Main title - clickable link to about */}
        <h1 
          className={`main-title fade-in-main-title ${titleLoaded ? 'loaded' : ''}`}
          onClick={() => setCurrentPage('about')}
          style={{
            fontSize: '8rem',
            fontWeight: '900',
            margin: '0',
            textAlign: 'center',
            lineHeight: '0.9',
            cursor: 'pointer',
            marginTop: '80px',
            color: 'white'
          }}>
          BINGO ROOM
        </h1>
        
      </div>
    </>
  )
}

export default App