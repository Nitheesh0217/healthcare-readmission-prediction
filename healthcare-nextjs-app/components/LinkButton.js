import { useRouter } from 'next/router';
import Link from 'next/link';
import theme from '../styles/theme';

export default function LinkButton({ href, children, className = '', icon = null, variant = 'primary', size = 'md' }) {
  const router = useRouter();
  const isActive = router.pathname === href;
  
  // Define button styles based on variant
  let buttonStyle = {};
  let hoverStyle = {};
  
  switch(variant) {
    case 'primary':
      buttonStyle = {
        backgroundColor: isActive ? theme.colors.secondary : theme.colors.primary,
        color: 'white',
        border: `1px solid ${isActive ? theme.colors.secondary : theme.colors.primary}`
      };
      hoverStyle = {
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.secondary
      };
      break;
    case 'outline':
      buttonStyle = {
        backgroundColor: 'transparent',
        color: theme.colors.primary,
        border: `1px solid ${theme.colors.primary}`
      };
      hoverStyle = {
        backgroundColor: 'rgba(52, 152, 219, 0.1)'
      };
      break;
    case 'light':
      buttonStyle = {
        backgroundColor: 'white',
        color: theme.colors.dark,
        border: '1px solid #dee2e6'
      };
      hoverStyle = {
        backgroundColor: '#f8f9fa'
      };
      break;
    case 'outline-light':
      buttonStyle = {
        backgroundColor: 'transparent',
        color: 'white',
        border: '1px solid white'
      };
      hoverStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      };
      break;
  }
  
  // Define button size
  let sizeStyle = {};
  switch(size) {
    case 'sm':
      sizeStyle = {
        padding: '0.25rem 0.5rem',
        fontSize: '0.875rem'
      };
      break;
    case 'md':
      sizeStyle = {
        padding: '0.5rem 1rem',
        fontSize: '1rem'
      };
      break;
    case 'lg':
      sizeStyle = {
        padding: '0.75rem 1.5rem',
        fontSize: '1.1rem'
      };
      break;
  }
  
  return (
    <Link 
      href={href}
      className={`btn ${className}`}
      style={{
        ...buttonStyle,
        ...sizeStyle,
        display: 'inline-block',
        fontWeight: 500,
        textAlign: 'center',
        borderRadius: '0.25rem',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, buttonStyle);
      }}
    >
      {icon && <i className={`fas ${icon} me-2`}></i>}
      {children}
    </Link>
  );
}
