import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Methodology() {
  return (
    <div>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 0' }}>
        <h1>Methodology</h1>
        <p className="lead">Our approach to predicting patient readmission risk</p>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Data Processing Pipeline</h2>
          
          <div className="methodology-step" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div className="step-number" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              marginRight: '1rem',
              fontWeight: '700',
              flexShrink: 0
            }}>1</div>
            <div>
              <h3>Data Collection</h3>
              <p>We utilized the Diabetes 130-US hospitals dataset from the UCI Machine Learning Repository, containing 101,766 patient encounters with 50 features including patient demographics, hospital details, medical history, and medications.</p>
            </div>
          </div>
          
          <div className="methodology-step" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div className="step-number" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              marginRight: '1rem',
              fontWeight: '700',
              flexShrink: 0
            }}>2</div>
            <div>
              <h3>Data Preprocessing</h3>
              <p>Our preprocessing pipeline included:</p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Handling missing values (replacing '?' with appropriate values)</li>
                <li>Converting categorical variables to numeric using encoding techniques</li>
                <li>Feature engineering (e.g., converting age ranges to numeric values)</li>
                <li>Normalizing numerical features</li>
                <li>Splitting data into training (80%) and testing (20%) sets</li>
              </ul>
            </div>
          </div>
          
          <div className="methodology-step" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div className="step-number" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              marginRight: '1rem',
              fontWeight: '700',
              flexShrink: 0
            }}>3</div>
            <div>
              <h3>Exploratory Data Analysis</h3>
              <p>We conducted comprehensive exploratory analysis to understand:</p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Distribution of readmission rates across different demographics</li>
                <li>Correlation between medical factors and readmission</li>
                <li>Temporal patterns in readmissions</li>
                <li>Impact of hospital procedures on readmission likelihood</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Machine Learning Models</h2>
          
          <div className="methodology-step" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div className="step-number" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              marginRight: '1rem',
              fontWeight: '700',
              flexShrink: 0
            }}>1</div>
            <div>
              <h3>Model Selection</h3>
              <p>We implemented and compared multiple machine learning models:</p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li><strong>Logistic Regression</strong>: A baseline model for binary classification</li>
                <li><strong>Random Forest Classifier</strong>: An ensemble method that builds multiple decision trees</li>
                <li><strong>XGBoost</strong>: An optimized gradient boosting implementation</li>
                <li><strong>Neural Networks</strong>: For capturing complex non-linear relationships</li>
              </ul>
            </div>
          </div>
          
          <div className="methodology-step" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div className="step-number" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              marginRight: '1rem',
              fontWeight: '700',
              flexShrink: 0
            }}>2</div>
            <div>
              <h3>Hyperparameter Tuning</h3>
              <p>We optimized model performance through:</p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Grid search cross-validation to find optimal parameters</li>
                <li>Learning rate adjustments for gradient-based methods</li>
                <li>Regularization techniques to prevent overfitting</li>
                <li>Ensemble methods to combine model strengths</li>
              </ul>
            </div>
          </div>
          
          <div className="methodology-step" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div className="step-number" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              marginRight: '1rem',
              fontWeight: '700',
              flexShrink: 0
            }}>3</div>
            <div>
              <h3>Model Evaluation</h3>
              <p>We evaluated models using multiple metrics:</p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li><strong>Accuracy</strong>: Overall correctness of predictions</li>
                <li><strong>Precision</strong>: Proportion of positive identifications that were correct</li>
                <li><strong>Recall</strong>: Proportion of actual positives that were identified correctly</li>
                <li><strong>F1 Score</strong>: Harmonic mean of precision and recall</li>
                <li><strong>ROC Curve and AUC</strong>: For assessing discrimination ability</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Implementation</h2>
          
          <div className="methodology-step" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div className="step-number" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              marginRight: '1rem',
              fontWeight: '700',
              flexShrink: 0
            }}>1</div>
            <div>
              <h3>Database Integration</h3>
              <p>We implemented a PostgreSQL database with:</p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Optimized schema for patient data and predictions</li>
                <li>Indexes for efficient query performance</li>
                <li>Views for common analytical queries</li>
                <li>Stored procedures for complex operations</li>
              </ul>
            </div>
          </div>
          
          <div className="methodology-step" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div className="step-number" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              marginRight: '1rem',
              fontWeight: '700',
              flexShrink: 0
            }}>2</div>
            <div>
              <h3>Web Application</h3>
              <p>We developed a Next.js web application featuring:</p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Interactive dashboard for data visualization</li>
                <li>Prediction tool for assessing readmission risk</li>
                <li>Responsive design for all device types</li>
                <li>Modern UI with intuitive navigation</li>
              </ul>
            </div>
          </div>
          
          <div className="methodology-step" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div className="step-number" style={{ 
              display: 'inline-block',
              width: '40px',
              height: '40px',
              lineHeight: '40px',
              textAlign: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '50%',
              marginRight: '1rem',
              fontWeight: '700',
              flexShrink: 0
            }}>3</div>
            <div>
              <h3>Deployment</h3>
              <p>Our solution is deployed with:</p>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Containerized architecture for scalability</li>
                <li>CI/CD pipeline for automated testing and deployment</li>
                <li>Monitoring and logging for system health</li>
                <li>Secure API endpoints for data access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
