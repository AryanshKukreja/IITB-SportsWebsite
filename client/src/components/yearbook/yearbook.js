import React from "react";

const Yearbook = () => {
  // Use PUBLIC_URL consistently to handle the /sports path correctly
  const pdfUrl = `${process.env.PUBLIC_URL}/yearbook.pdf`;
  
  return (
    <div style={{ padding: 20 }}>
      <header className="cs-header">
        <h1>Yearbook</h1>
      </header>

      <div style={{ height: 700, width: '100%' }}>
        <iframe
          src={pdfUrl}
          title="Yearbook PDF"
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          <p>Your browser does not support PDFs. <a href={pdfUrl}>Download the PDF</a>.</p>
        </iframe>
      </div>
    </div>
  );
};

export default Yearbook;
