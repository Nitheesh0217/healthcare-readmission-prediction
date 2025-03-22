import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LinkButton from '../components/LinkButton';
import theme from '../styles/theme';

export default function Dashboard() {
  useEffect(() => {
    // Initialize tabs functionality
    const tabLinks = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-pane');
    
    tabLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all tabs
        tabLinks.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current tab
        e.currentTarget.classList.add('active');
        const target = e.currentTarget.getAttribute('href').substring(1);
        document.getElementById(target).classList.add('active');
      });
    });
    
    // Cleanup event listeners on unmount
    return () => {
      tabLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);
  
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      
      <div className="container" style={{ padding: '1rem 0 3rem' }}>
        <h1>Healthcare Readmission Analytics Dashboard</h1>
        
        <div style={{ marginTop: '2rem' }}>
          <ul className="nav-tabs" style={{ 
            display: 'flex', 
            listStyle: 'none', 
            padding: 0, 
            borderBottom: '1px solid #dee2e6',
            marginBottom: 0
          }}>
            <li style={{ marginRight: '1rem' }}>
              <a href="#overview" className="nav-tab active" style={{
                display: 'block',
                padding: '0.75rem 1rem',
                fontWeight: 600,
                color: theme.colors.primary,
                textDecoration: 'none',
                borderBottom: `3px solid ${theme.colors.primary}`
              }}>Overview</a>
            </li>
            <li style={{ marginRight: '1rem' }}>
              <a href="#demographics" className="nav-tab" style={{
                display: 'block',
                padding: '0.75rem 1rem',
                fontWeight: 600,
                color: '#7f8c8d',
                textDecoration: 'none',
                borderBottom: '3px solid transparent'
              }}>Demographics</a>
            </li>
            <li style={{ marginRight: '1rem' }}>
              <a href="#clinical" className="nav-tab" style={{
                display: 'block',
                padding: '0.75rem 1rem',
                fontWeight: 600,
                color: '#7f8c8d',
                textDecoration: 'none',
                borderBottom: '3px solid transparent'
              }}>Clinical Factors</a>
            </li>
            <li style={{ marginRight: '1rem' }}>
              <a href="#model" className="nav-tab" style={{
                display: 'block',
                padding: '0.75rem 1rem',
                fontWeight: 600,
                color: '#7f8c8d',
                textDecoration: 'none',
                borderBottom: '3px solid transparent'
              }}>Model Performance</a>
            </li>
            <li>
              <a href="#correlations" className="nav-tab" style={{
                display: 'block',
                padding: '0.75rem 1rem',
                fontWeight: 600,
                color: '#7f8c8d',
                textDecoration: 'none',
                borderBottom: '3px solid transparent'
              }}>Correlations</a>
            </li>
          </ul>
        </div>
        
        <div className="tab-content" style={{ marginTop: '2rem' }}>
          <div id="overview" className="tab-pane active" style={{ display: 'block' }}>
            <div className="row">
              <div className="col-6">
                <div className="card">
                  <h3>Readmission Distribution</h3>
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-chart-pie" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>Readmission Distribution Chart</p>
                      <p>Not Readmitted: 53.91% | Readmitted: 46.09%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card">
                  <h3>Key Metrics</h3>
                  <div className="row" style={{ margin: '1rem 0' }}>
                    <div className="col-6">
                      <div className="metric-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="label">Overall Readmission Rate</div>
                        <div className="value">46.09%</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="metric-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="label">Total Patients</div>
                        <div className="value">101,766</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="metric-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="label">Best Model Accuracy</div>
                        <div className="value" style={{ color: theme.colors.success }}>90.2%</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="metric-card" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                        <div className="label">High Risk Patients</div>
                        <div className="value" style={{ color: theme.colors.danger }}>23.5%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row" style={{ marginTop: '2rem' }}>
              <div className="col">
                <div className="card">
                  <h3>Top Factors Correlated with Readmission</h3>
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-chart-bar" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>Correlation Chart</p>
                      <p>1. Number of Inpatient Visits (0.217)</p>
                      <p>2. Number of Diagnoses (0.113)</p>
                      <p>3. Number of Emergency Visits (0.103)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div id="demographics" className="tab-pane" style={{ display: 'none' }}>
            <div className="row">
              <div className="col-6">
                <div className="card">
                  <h3>Readmission Rate by Age Group</h3>
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-chart-bar" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>Age Group Chart</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card">
                  <h3>Readmission Rate by Gender</h3>
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-venus-mars" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>Gender Chart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row" style={{ marginTop: '2rem' }}>
              <div className="col">
                <div className="card">
                  <h3>Readmission Rate by Race</h3>
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-users" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>Race Chart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div id="clinical" className="tab-pane" style={{ display: 'none' }}>
            <div className="row">
              <div className="col-6">
                <div className="card">
                  <h3>Readmission by Number of Diagnoses</h3>
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-stethoscope" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>Diagnoses Chart</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card">
                  <h3>Readmission by Time in Hospital</h3>
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-clock" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>Hospital Time Chart</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div id="model" className="tab-pane" style={{ display: 'none' }}>
            <div className="row">
              <div className="col-6">
                <div className="card">
                  <h3>Model Comparison</h3>
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-brain" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>Model Comparison Chart</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card">
                  <h3>ROC Curve</h3>
                  <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-chart-line" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>ROC Curve</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div id="correlations" className="tab-pane" style={{ display: 'none' }}>
            <div className="row">
              <div className="col">
                <div className="card">
                  <h3>Feature Correlation Matrix</h3>
                  <div style={{ height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <i className="fas fa-th" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1rem' }}></i>
                      <p>Correlation Matrix</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
