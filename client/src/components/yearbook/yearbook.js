import React, { useState } from "react";

const Yearbook = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pdfUrl = `${process.env.PUBLIC_URL}/yearbook.pdf`;
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Sports_Yearbook_2024-25.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const containerStyle = isFullscreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'white',
    zIndex: 9999,
    padding: 0,
    margin: 0,
  } : {
    padding: 20
  };

  const iframeStyle = isFullscreen ? {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: 0
  } : {
    width: '100%',
    height: '100%',
    border: '1px solid #ddd',
    borderRadius: '4px'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    marginRight: '10px',
  };

  const buttonContainerStyle = {
    position: isFullscreen ? 'fixed' : 'absolute',
    top: isFullscreen ? '10px' : '10px',
    right: isFullscreen ? '10px' : '10px',
    zIndex: 10000,
    display: 'flex',
    gap: '10px',
  };

  return (
    <div style={containerStyle}>
      {!isFullscreen && (
        <header className="cs-header">
          <h1>Sports Yearbook 2024-25</h1>
        </header>
      )}

      <div style={{ 
        height: isFullscreen ? '100vh' : 700, 
        width: '100%',
        position: 'relative'
      }}>
        <div style={buttonContainerStyle}>
          <button 
            onClick={handleDownload}
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#28a745'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            title="Download PDF"
          >
            ⬇ Download
          </button>
          
          <button 
            onClick={toggleFullscreen}
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? '✕ Exit Fullscreen' : '⛶ Fullscreen'}
          </button>
        </div>
        
        <iframe
          src={pdfUrl}
          title="Yearbook PDF"
          style={iframeStyle}
        >
          <p>Your browser does not support PDFs. <a href={pdfUrl}>Download the PDF</a>.</p>
        </iframe>
      </div>
    </div>
  );
};

export default Yearbook;