import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <h4>Healthcare Readmission Analytics</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.5rem' }}>
              Reducing readmission rates through advanced analytics and machine learning
            </p>
            <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
              {[
                { icon: 'fa-twitter', url: '#' },
                { icon: 'fa-linkedin', url: '#' },
                { icon: 'fa-github', url: '#' },
                { icon: 'fa-envelope', url: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <i className={`fab ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div className="col-3">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {[
                { label: 'Home', path: '/' },
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Predictor', path: '/predictor' },
                { label: 'Methodology', path: '/methodology' },
                { label: 'About', path: '/about' }
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-3">
            <h4>Resources</h4>
            <ul className="footer-links">
              {[
                { label: 'Documentation', path: '#' },
                { label: 'API Reference', path: '#' },
                { label: 'Research Papers', path: '#' },
                { label: 'Data Sources', path: '#' },
                { label: 'Model Information', path: '#' }
              ].map((link, index) => (
                <li key={index}>
                  <Link href={link.path}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-3">
            <h4>Contact Us</h4>
            <div>
              <div style={{ marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                <i className="fas fa-map-marker-alt" style={{ marginRight: '0.5rem', color: '#3498db' }}></i>
                123 Healthcare Ave, Medical District
              </div>
              <div style={{ marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                <i className="fas fa-phone" style={{ marginRight: '0.5rem', color: '#3498db' }}></i>
                (555) 123-4567
              </div>
              <div style={{ marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                <i className="fas fa-envelope" style={{ marginRight: '0.5rem', color: '#3498db' }}></i>
                contact@healthcareanalytics.com
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {currentYear} Healthcare Readmission Analytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
