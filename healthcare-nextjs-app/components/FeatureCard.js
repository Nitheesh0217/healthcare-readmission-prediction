import React from 'react';
import theme from '../styles/theme';

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card card">
      <div>
        <i 
          className={`fas ${icon}`}
          style={{ fontSize: '3rem', color: theme.colors.primary, marginBottom: '1rem' }}
        ></i>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
