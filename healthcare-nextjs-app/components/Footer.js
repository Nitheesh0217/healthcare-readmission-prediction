import { useEffect } from 'react';
import theme from '../styles/theme';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h5><i className="fas fa-hospital-user me-2"></i>Healthcare Readmission Predictive Analytics</h5>
            <p>A machine learning approach to reducing hospital readmissions</p>
            <div className="social-icons" style={{ marginTop: '1rem' }}>
              <a href="https://github.com/Nitheesh0217" style={{ color: 'white', marginRight: '1rem', fontSize: '1.2rem' }}>
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/nitheeshd" style={{ color: 'white', marginRight: '1rem', fontSize: '1.2rem' }}>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" style={{ color: 'white', marginRight: '1rem', fontSize: '1.2rem' }}>
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          <div className="col-6" style={{ textAlign: 'right' }}>
            <p>&copy; {new Date().getFullYear()} Healthcare Analytics Project</p>
            <p style={{ marginTop: '0.5rem' }}>
              <a href="#" style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none' }}>Terms of Service</a>
              <a href="#" style={{ color: 'white', marginLeft: '1rem', textDecoration: 'none' }}>Contact</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
