import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import MetricCard from '../components/MetricCard';
import theme from '../styles/theme';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);
  
  return (
    <div>
      <Navbar />
      
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <h1 className={`${isVisible ? 'fade-in' : ''}`} style={{ 
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.6s ease'
              }}>Healthcare Readmission Predictive Analytics</h1>
              <p className="lead" style={{ 
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.6s ease',
                transitionDelay: '0.2s'
              }}>A machine learning approach to reducing hospital readmissions</p>
              <p style={{ 
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.6s ease',
                transitionDelay: '0.4s'
              }}>This project aims to develop a predictive analytics solution for healthcare patient readmission using machine learning and statistical modeling. By analyzing patterns in patient data, we can identify high-risk patients and help hospitals implement preventive measures to reduce unnecessary readmissions.</p>
              <div style={{ 
                marginTop: '1.5rem',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.6s ease',
                transitionDelay: '0.6s'
              }}>
                <Link href="/dashboard" className="btn btn-light btn-lg" style={{ marginRight: '0.5rem' }}>
                  <i className="fas fa-chart-line me-2"></i>View Dashboard
                </Link>
                <Link href="/predictor" className="btn btn-outline btn-outline-light btn-lg">
                  <i className="fas fa-user-md me-2"></i>Try Predictor
                </Link>
              </div>
            </div>
            <div className="col-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ 
                maxWidth: '400px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                transitionDelay: '0.4s'
              }}>
                <div style={{ width: '100%', height: '300px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <i className="fas fa-chart-line" style={{ fontSize: '5rem' }}></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Key Features</h2>
          <div className="row">
            <div className="col-4">
              <FeatureCard 
                title="Data Analysis"
                description="Comprehensive analysis of the Diabetes 130-US hospitals dataset with 101,766 patient records and 50 columns."
                icon="fa-chart-line"
                buttonText="Explore Data"
                buttonLink="/dashboard"
              />
            </div>
            <div className="col-4">
              <FeatureCard 
                title="Machine Learning Models"
                description="Implementation of multiple models including Logistic Regression, Random Forest, and XGBoost with hyperparameter tuning."
                icon="fa-brain"
                buttonText="Learn More"
                buttonLink="/methodology"
              />
            </div>
            <div className="col-4">
              <FeatureCard 
                title="Readmission Prediction"
                description="Interactive tool to predict patient readmission risk and provide targeted intervention recommendations."
                icon="fa-user-md"
                buttonText="Try Predictor"
                buttonLink="/predictor"
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Project Objectives</h2>
          <div className="row">
            <div className="col-6">
              <div className="card" style={{ height: '100%' }}>
                <h3>Our Goals</h3>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li><i className="fas fa-check-circle" style={{ color: theme.colors.primary, marginRight: '0.5rem' }}></i> Predict patient readmission risk with high accuracy</li>
                  <li><i className="fas fa-check-circle" style={{ color: theme.colors.primary, marginRight: '0.5rem' }}></i> Identify key medical and demographic factors influencing readmissions</li>
                  <li><i className="fas fa-check-circle" style={{ color: theme.colors.primary, marginRight: '0.5rem' }}></i> Create interactive visualizations for readmission analysis</li>
                  <li><i className="fas fa-check-circle" style={{ color: theme.colors.primary, marginRight: '0.5rem' }}></i> Develop a database system for efficient data storage and retrieval</li>
                  <li><i className="fas fa-check-circle" style={{ color: theme.colors.primary, marginRight: '0.5rem' }}></i> Implement advanced techniques to achieve &gt;90% prediction accuracy</li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <div className="card" style={{ height: '100%' }}>
                <h3>Project Impact</h3>
                <p>Hospital readmissions are costly for healthcare systems and can indicate issues with quality of care. By predicting which patients are at high risk for readmission, healthcare providers can:</p>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  <li><strong>Implement targeted interventions</strong> for high-risk patients</li>
                  <li><strong>Reduce unnecessary readmissions</strong> and associated costs</li>
                  <li><strong>Improve patient outcomes</strong> and satisfaction</li>
                  <li><strong>Optimize resource allocation</strong> in healthcare facilities</li>
                  <li><strong>Support data-driven decision making</strong> in healthcare management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Project Statistics</h2>
          <div className="row">
            <div className="col-3">
              <MetricCard 
                title="Dataset Size"
                value={101766}
                icon="fa-database"
                suffix=" Records"
              />
            </div>
            <div className="col-3">
              <MetricCard 
                title="Model Accuracy"
                value="90.2"
                icon="fa-bullseye"
                suffix="%"
                color={theme.colors.success}
              />
            </div>
            <div className="col-3">
              <MetricCard 
                title="Readmission Rate"
                value="46.1"
                icon="fa-hospital"
                suffix="%"
                color={theme.colors.warning}
              />
            </div>
            <div className="col-3">
              <MetricCard 
                title="Risk Factors"
                value="15"
                icon="fa-exclamation-triangle"
                suffix="+"
                color={theme.colors.danger}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
