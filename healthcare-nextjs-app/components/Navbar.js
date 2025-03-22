import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import LinkButton from './LinkButton';
import theme from '../styles/theme';

export default function Navbar() {
  const router = useRouter();
  
  // Add active class to current page link
  useEffect(() => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[href="${router.pathname}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }, [router.pathname]);
  
  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="navbar-brand">
          <i className="fas fa-hospital-user me-2"></i>
          Healthcare Readmission Analytics
        </Link>
        <div className="nav-links">
          <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
            <i className="fas fa-home me-1"></i> Home
          </Link>
          <Link href="/dashboard" className={`nav-link ${router.pathname === '/dashboard' ? 'active' : ''}`}>
            <i className="fas fa-chart-line me-1"></i> Dashboard
          </Link>
          <Link href="/predictor" className={`nav-link ${router.pathname === '/predictor' ? 'active' : ''}`}>
            <i className="fas fa-user-md me-1"></i> Predictor
          </Link>
          <Link href="/methodology" className={`nav-link ${router.pathname === '/methodology' ? 'active' : ''}`}>
            <i className="fas fa-microscope me-1"></i> Methodology
          </Link>
          <Link href="/about" className={`nav-link ${router.pathname === '/about' ? 'active' : ''}`}>
            <i className="fas fa-info-circle me-1"></i> About
          </Link>
        </div>
      </div>
    </nav>
  );
}
