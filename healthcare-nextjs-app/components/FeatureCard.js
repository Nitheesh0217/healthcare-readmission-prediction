import { useEffect, useState } from 'react';
import theme from '../styles/theme';

export default function FeatureCard({ title, description, icon, buttonText, buttonLink }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card feature-card" 
      style={{ 
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)', 
        boxShadow: isHovered ? theme.shadows.large : theme.shadows.medium,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        height: '100%'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 1.5rem' }}>
        <i className={`fas ${icon}`} style={{ 
          fontSize: '3rem', 
          marginBottom: '1.5rem', 
          color: theme.colors.primary,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}></i>
        <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>{title}</h3>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', flex: '1' }}>{description}</p>
        <a 
          href={buttonLink} 
          className="btn btn-primary" 
          style={{ 
            backgroundColor: isHovered ? theme.colors.secondary : theme.colors.primary,
            borderColor: isHovered ? theme.colors.secondary : theme.colors.primary,
            transition: 'background-color 0.3s ease, border-color 0.3s ease'
          }}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}
