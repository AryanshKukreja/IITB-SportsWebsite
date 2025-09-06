import React, { useState } from "react";
import "./yearbook.css";
import { PiCornersOut } from "react-icons/pi";
import { PiCornersIn } from "react-icons/pi";

const Yearbook = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const pdfUrl = `${process.env.PUBLIC_URL}/yearbook.pdf`;
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
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
        <div className="yb-button-container">
          
          <div>

          {isFullscreen ? <PiCornersIn 
          className="yb-corner"
          onClick={toggleFullscreen} 
          size={20} 
          style={{ verticalAlign: 'middle', cursor: "pointer" }}
          /> : <PiCornersOut 
          className="yb-corner"
          onClick={toggleFullscreen} 
          size={20} 
          style={{ verticalAlign: 'middle' , cursor: "pointer"}} 
          />}
          </div>

          
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