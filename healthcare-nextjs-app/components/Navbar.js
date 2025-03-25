import React from 'react';
import Link from 'next/link';
import theme from '../styles/theme';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/" className="navbar-logo">
            <i className="fas fa-heartbeat" style={{ marginRight: '0.5rem', color: theme.colors.primary }}></i>
            <span>Healthcare Analytics</span>
          </Link>
          
          <button 
            className="navbar-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div className={`navbar-menu ${isOpen ? 'is-open' : ''}`}>
          <div className="navbar-end">
            <Link href="/" className="navbar-item">
              Home
            </Link>
            <Link href="/dashboard" className="navbar-item">
              Dashboard
            </Link>
            <Link href="/predictor" className="navbar-item">
              Predictor
            </Link>
            <Link href="/methodology" className="navbar-item">
              Methodology
            </Link>
            <Link href="/about" className="navbar-item">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
