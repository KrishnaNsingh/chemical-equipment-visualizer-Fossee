import React from 'react';

const DeploymentBanner = () => {
  const bannerStyle = {
    backgroundColor: '#292825', // Soft warning yellow
    color: '#856404',           // Darker gold text for readability
    padding: '12px 20px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '500',
    borderBottom: '1px solid #292824',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: '100%'
  };

  const linkStyle = {
    color: '#533f03',
    textDecoration: 'underline',
    fontWeight: 'bold'
  };

  return (
    <div style={bannerStyle}>
      <span>⚙️ Backend runs on <strong>Render</strong>. Please wait for the service to wake up.</span>
      <a 
        href="https://chemical-equipment-backend-xthm.onrender.com/admin/" 
        target="_blank" 
        rel="noopener noreferrer"
        style={linkStyle}
      >
        Check Progress
      </a>
    </div>
  );
};

export default DeploymentBanner;