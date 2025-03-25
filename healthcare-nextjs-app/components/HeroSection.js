import React from 'react';
import theme from '../styles/theme';

export default function HeroSection({ title, subtitle, children }) {
  return (
    <div className="hero-section">
      <div className="container">
        <h1>{title}</h1>
        <p className="lead">{subtitle}</p>
        {children}
        
        {/* Background elements */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '15%',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0
          }}
        />
        
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '30%',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            zIndex: 0
          }}
        />
      </div>
    </div>
  );
}
