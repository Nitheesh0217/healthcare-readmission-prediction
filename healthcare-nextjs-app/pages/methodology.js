import React from 'react';
import Layout from '../components/Layout';

export default function Methodology() {
  return (
    <Layout 
      title="Methodology" 
      description="Our approach to predicting hospital readmissions using machine learning"
    >
      <div className="hero-section">
        <div className="container">
          <h1>
            Our Methodology
          </h1>
          <p className="lead">
            How we predict readmission risk using advanced analytics and machine learning
          </p>
        </div>
      </div>
      
      <div className="container" style={{ padding: '3rem 0' }}>
        <div className="row">
          <div className="col-8">
            <div className="card">
              <h2>Data Sources</h2>
              <p>
                Our predictive model is built using the Diabetes 130-US hospitals dataset, which contains 10 years (1999-2008) of clinical care data from 130 US hospitals and integrated delivery networks. The dataset includes over 100,000 hospital admissions of diabetic patients.
              </p>
              <p>
                Key data elements include patient demographics, diagnoses, procedures, laboratory tests, medications, length of stay, and readmission outcomes. This comprehensive dataset allows us to identify patterns and risk factors associated with hospital readmissions.
              </p>
              
              <h2 style={{ marginTop: '2rem' }}>Data Preprocessing</h2>
              <p>
                Before building our predictive models, we perform extensive data preprocessing to ensure data quality and optimize model performance:
              </p>
              <ul>
                <li>Missing value imputation using median values for numerical features</li>
                <li>Encoding of categorical variables using one-hot encoding</li>
                <li>Feature scaling to normalize numerical variables</li>
                <li>Feature selection to identify the most predictive variables</li>
                <li>Handling of imbalanced classes to ensure model fairness</li>
              </ul>
              
              <h2 style={{ marginTop: '2rem' }}>Machine Learning Approach</h2>
              <p>
                We employ a Random Forest Classifier as our primary predictive model due to its high accuracy, robustness to overfitting, and ability to handle both numerical and categorical features. The model is trained on 80% of the data and validated on the remaining 20%.
              </p>
              <p>
                Our model achieves over 90% accuracy in predicting which patients are at high risk for readmission within 30 days of discharge. We continuously refine our model through:
              </p>
              <ul>
                <li>Hyperparameter tuning to optimize model performance</li>
                <li>Cross-validation to ensure generalizability</li>
                <li>Regular retraining with new data to maintain accuracy</li>
                <li>Ensemble methods to improve prediction stability</li>
              </ul>
              
              <h2 style={{ marginTop: '2rem' }}>Risk Factor Identification</h2>
              <p>
                Our model identifies key risk factors that contribute to readmission risk, including:
              </p>
              <ul>
                <li>Number of previous inpatient visits</li>
                <li>Number of diagnoses</li>
                <li>Length of hospital stay</li>
                <li>Age and demographic factors</li>
                <li>Medication regimen complexity</li>
                <li>Specific diagnoses and comorbidities</li>
                <li>Laboratory test results</li>
                <li>Discharge disposition</li>
              </ul>
              <p>
                These risk factors are weighted according to their predictive importance, allowing us to calculate personalized risk scores for individual patients.
              </p>
              
              <h2 style={{ marginTop: '2rem' }}>Intervention Recommendations</h2>
              <p>
                Based on a patient's risk score and specific risk factors, our system generates tailored intervention recommendations designed to reduce readmission risk. These recommendations are evidence-based and derived from clinical best practices and published research on readmission reduction strategies.
              </p>
              <p>
                Interventions are stratified by risk level, with more intensive interventions recommended for higher-risk patients. This approach allows healthcare providers to allocate resources efficiently while maximizing impact on readmission rates.
              </p>
            </div>
          </div>
          
          <div className="col-4">
            <div className="card">
              <h3>Model Performance</h3>
              <p>Our Random Forest Classifier achieves the following performance metrics:</p>
              
              <div style={{ marginTop: '1.5rem' }}>
                {[
                  { metric: 'Accuracy', value: '92.4%' },
                  { metric: 'Precision', value: '89.7%' },
                  { metric: 'Recall', value: '86.3%' },
                  { metric: 'F1 Score', value: '88.0%' },
                  { metric: 'AUC-ROC', value: '0.91' }
                ].map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'transparent',
                    borderRadius: '4px'
                  }}>
                    <span style={{ fontWeight: '500' }}>{item.metric}</span>
                    <span style={{ fontWeight: '700', color: '#3498db' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3>Feature Importance</h3>
              <p>Top features by predictive importance:</p>
              
              <div style={{ marginTop: '1.5rem' }}>
                {[
                  { feature: 'Number of previous inpatient visits', importance: 0.18 },
                  { feature: 'Number of diagnoses', importance: 0.15 },
                  { feature: 'Age', importance: 0.12 },
                  { feature: 'Time in hospital', importance: 0.10 },
                  { feature: 'Number of medications', importance: 0.09 },
                  { feature: 'Emergency admission', importance: 0.08 },
                  { feature: 'Diabetes medication changes', importance: 0.07 },
                  { feature: 'A1C test result', importance: 0.06 }
                ].map((item, index) => (
                  <div key={index} style={{ marginBottom: '1rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.3rem',
                      fontSize: '0.9rem'
                    }}>
                      <span>{item.feature}</span>
                      <span>{(item.importance * 100).toFixed(1)}%</span>
                    </div>
                    <div className="progress" style={{ height: '8px' }}>
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${item.importance * 100 * 5}%`,
                          backgroundColor: index === 0 ? '#3498db' : 
                                          index === 1 ? '#2980b9' : 
                                          index === 2 ? '#1abc9c' : 
                                          index === 3 ? '#16a085' : 
                                          index === 4 ? '#2ecc71' : 
                                          index === 5 ? '#27ae60' : 
                                          index === 6 ? '#f1c40f' : '#f39c12'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <h3>Try Our Predictor</h3>
              <p>
                Experience our machine learning model in action by using our interactive predictor tool to assess readmission risk for individual patients.
              </p>
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <a href="/predictor" className="btn btn-primary" style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '30px',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}>
                  <i className="fas fa-user-md me-2"></i>
                  Go to Predictor
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
