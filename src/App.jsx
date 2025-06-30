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
          {/* LIVE text */}
          <span 
            style={{
              fontSize: '10px',
              letterSpacing: '1px',
              animation: 'offlineFlash 1.5s infinite'
            }}>
            LIVE
          </span>
          
          {/* Red dot */}
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
          animation: ${isLive ? 'offlineFlash 1.5s infinite' : 'none'};
        }
        
        .live-text {
          animation: ${isLive ? 'offlineFlash 1.5s infinite' : 'none'};
        }
        
        .main-title {
          animation: subtleFloat 8s ease-in-out infinite;
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
          animation: fadeIn 2.5s ease-out 0.5s forwards;
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
        fontFamily: 'Akzidenz-Grotesk, Helvetica, Arial, sans-serif',
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
        
        {/* Live indicator - top right like offline */}
        {isLive && (
          <div 
            className="fade-in-live"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
            {/* LIVE text */}
            <span 
              className="live-text"
              style={{
                fontSize: '10px',
                letterSpacing: '1px'
              }}>
              LIVE
            </span>
            
            {/* Red dot */}
            <div 
              className="live-dot"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'red'
              }}
            ></div>
          </div>
        )}

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
            cursor: 'pointer'
          }}>
          BINGO ROOM
        </h1>
        
      </div>
    </>
  )
}

export default App