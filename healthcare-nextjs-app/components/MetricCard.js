import React from 'react';
import theme from '../styles/theme';

export default function MetricCard({ title, value, icon, color, change }) {
  return (
    <div className="metric-card card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: `${color}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <i className={`fas ${icon}`} style={{ color }}></i>
        </div>
      </div>
      <div className="value" style={{ color }}>
        {value}
      </div>
      {change && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: '0.8rem',
          color: '#7f8c8d',
          marginTop: '0.5rem'
        }}>
          <span>vs. Previous Period</span>
          <span style={{ 
            color: change.startsWith('+') ? theme.colors.secondary : theme.colors.danger 
          }}>{change}</span>
        </div>
      )}
    </div>
  );
}
