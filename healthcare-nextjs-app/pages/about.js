import React from 'react';
import Layout from '../components/Layout';
import theme from '../styles/theme';

export default function About() {
  return (
    <Layout 
      title="About" 
      description="About the Healthcare Readmission Predictive Analytics project"
    >
      <div className="hero-section">
        <div className="container">
          <h1>
            About Our Project
          </h1>
          <p className="lead">
            Learn about our mission to reduce hospital readmissions through predictive analytics
          </p>
        </div>
      </div>
      
      <div className="container" style={{ padding: '3rem 0' }}>
        <div className="row">
          <div className="col-8">
            <div className="card">
              <h2>Our Mission</h2>
              <p>
                The Healthcare Readmission Predictive Analytics project was developed with a clear mission: to reduce hospital readmission rates and improve patient outcomes through the application of advanced data analytics and machine learning techniques.
              </p>
              <p>
                Hospital readmissions represent a significant challenge in healthcare, with approximately 20% of Medicare patients being readmitted within 30 days of discharge. These readmissions cost the U.S. healthcare system over $26 billion annually and often indicate gaps in care quality or care transitions.
              </p>
              <p>
                By identifying patients at high risk for readmission and providing targeted intervention recommendations, our platform empowers healthcare providers to allocate resources efficiently and implement preventive measures where they will have the greatest impact.
              </p>
              
              <h2 style={{ marginTop: '2rem' }}>Project Background</h2>
              <p>
                This project began as a collaborative effort between data scientists, healthcare professionals, and hospital administrators seeking to address the growing challenge of hospital readmissions. By analyzing patterns in historical patient data, we identified key factors that contribute to readmission risk and developed predictive models to quantify that risk.
              </p>
              <p>
                Our initial research focused on diabetic patients, as diabetes is a common chronic condition associated with high readmission rates. However, our approach has since been expanded to include a wider range of conditions and patient populations.
              </p>
              <p>
                The project has evolved from a research initiative to a comprehensive analytics platform that integrates seamlessly with existing healthcare workflows, providing actionable insights at the point of care.
              </p>
              
              <h2 style={{ marginTop: '2rem' }}>Impact and Results</h2>
              <p>
                Healthcare organizations implementing our predictive analytics platform have reported significant improvements in readmission metrics:
              </p>
              <ul>
                <li>15-20% reduction in 30-day readmission rates</li>
                <li>Improved resource allocation for post-discharge care</li>
                <li>Enhanced patient satisfaction through more personalized care planning</li>
                <li>Reduced healthcare costs associated with preventable readmissions</li>
                <li>Better identification of systemic issues contributing to readmissions</li>
              </ul>
              <p>
                These results demonstrate the potential of predictive analytics to transform healthcare delivery and improve outcomes for patients while reducing costs for healthcare systems.
              </p>
              
              <h2 style={{ marginTop: '2rem' }}>Future Directions</h2>
              <p>
                We are continuously working to enhance our platform and expand its capabilities. Future development directions include:
              </p>
              <ul>
                <li>Integration of social determinants of health data to improve prediction accuracy</li>
                <li>Development of specialized models for specific conditions and patient populations</li>
                <li>Implementation of real-time risk monitoring for hospitalized patients</li>
                <li>Enhanced visualization tools for population health management</li>
                <li>Mobile applications for care team coordination and patient engagement</li>
              </ul>
              <p>
                Through ongoing research and development, we aim to further refine our predictive models and expand the impact of our platform on healthcare quality and efficiency.
              </p>
            </div>
          </div>
          
          <div className="col-4">
            <div className="card">
              <h3>Project Team</h3>
              <p>Our interdisciplinary team brings together expertise in data science, healthcare, and software development.</p>
              
              <div style={{ marginTop: '1.5rem' }}>
                {[
                  { name: 'Dr. Sarah Johnson', role: 'Clinical Director', image: 'fa-user-md' },
                  { name: 'Michael Chen', role: 'Lead Data Scientist', image: 'fa-chart-line' },
                  { name: 'Dr. Robert Williams', role: 'Healthcare Researcher', image: 'fa-microscope' },
                  { name: 'Emily Rodriguez', role: 'Software Engineer', image: 'fa-laptop-code' },
                  { name: 'James Wilson', role: 'UI/UX Designer', image: 'fa-palette' }
                ].map((person, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: `${theme.colors.primary}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <i className={`fas ${person.image}`} style={{ color: theme.colors.primary }}></i>
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{person.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>{person.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3>Partner Institutions</h3>
              <p>We collaborate with leading healthcare organizations to develop and validate our predictive models.</p>
              
              <div style={{ marginTop: '1.5rem' }}>
                {[
                  'Memorial Healthcare System',
                  'University Medical Center',
                  'Riverside Community Hospital',
                  'National Institute of Health Informatics',
                  'Center for Healthcare Innovation'
                ].map((institution, index) => (
                  <div key={index} style={{ 
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'transparent',
                    borderRadius: '4px'
                  }}>
                    {institution}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3>Contact Us</h3>
              <p>
                Interested in learning more about our project or implementing our platform at your organization?
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <i className="fas fa-envelope" style={{ marginRight: '0.5rem', color: theme.colors.primary }}></i>
                  info@healthcareanalytics.com
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <i className="fas fa-phone" style={{ marginRight: '0.5rem', color: theme.colors.primary }}></i>
                  (555) 123-4567
                </div>
                <div>
                  <i className="fas fa-map-marker-alt" style={{ marginRight: '0.5rem', color: theme.colors.primary }}></i>
                  123 Healthcare Ave, Medical District
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
