import { useRouter } from 'next/router';
import Link from 'next/link';
import theme from '../styles/theme';

export default function Breadcrumb() {
  const router = useRouter();
  const pathSegments = router.pathname.split('/').filter(segment => segment);
  
  // Create breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    ...pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return {
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        path
      };
    })
  ];
  
  return (
    <div style={{ 
      padding: '0.75rem 0', 
      marginBottom: '1.5rem',
      color: '#6c757d'
    }}>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            padding: 0, 
            margin: 0, 
            listStyle: 'none'
          }}>
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              
              return (
                <li key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center'
                }}>
                  {index > 0 && (
                    <span style={{ margin: '0 0.5rem' }}>
                      <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem' }}></i>
                    </span>
                  )}
                  
                  {isLast ? (
                    <span style={{ fontWeight: 600, color: theme.colors.primary }}>
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.path} style={{ 
                      color: '#6c757d', 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}>
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
