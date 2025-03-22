import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import theme from '../styles/theme';

export default function Custom404() {
  return (
    <div>
      <Navbar />
      
      <div className="container" style={{ 
        padding: '5rem 0',
        textAlign: 'center',
        minHeight: 'calc(100vh - 300px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          fontSize: '8rem', 
          color: theme.colors.primary,
          marginBottom: '1rem'
        }}>
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
        <p className="lead" style={{ marginBottom: '2rem' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          <i className="fas fa-home me-2"></i>Return to Home
        </Link>
      </div>
      
      <Footer />
    </div>
  );
}
