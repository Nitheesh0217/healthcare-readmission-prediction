import { useEffect, useState } from 'react';
import theme from '../styles/theme';

export default function MetricCard({ title, value, icon, color = theme.colors.primary, suffix = '', prefix = '' }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    // Animate the value counting up
    let start = 0;
    const end = parseInt(value);
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setAnimatedValue(end);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <div className="metric-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', color: color, marginBottom: '0.5rem' }}>
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="label" style={{ fontSize: '1rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>{title}</div>
      <div className="value" style={{ fontSize: '2.5rem', fontWeight: '700', color: color }}>
        {prefix}{typeof value === 'number' && value > 100 ? animatedValue.toLocaleString() : value}{suffix}
      </div>
    </div>
  );
}
