import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div>
      <Navbar />
      
      <div className="container" style={{ padding: '2rem 0' }}>
        <h1>About the Project</h1>
        <p className="lead">Learn more about our Healthcare Readmission Predictive Analytics project</p>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Project Overview</h2>
          <p>
            The Healthcare Readmission Predictive Analytics project aims to develop a predictive analytics solution 
            for healthcare patient readmission using machine learning and statistical modeling. By analyzing patterns 
            in patient data, we can identify high-risk patients and help hospitals implement preventive measures to 
            reduce unnecessary readmissions.
          </p>
          <p>
            Hospital readmissions are costly for healthcare systems and can indicate issues with quality of care. 
            Our solution provides healthcare providers with data-driven insights to improve patient outcomes and 
            optimize resource allocation.
          </p>
        </div>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Key Objectives</h2>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Predict Readmission Risk:</strong> Develop machine learning models to classify whether a patient will be readmitted</li>
            <li><strong>Data-Driven Decision Making:</strong> Analyze key medical and demographic factors influencing readmissions</li>
            <li><strong>Interactive Visualization:</strong> Create interactive dashboards to visualize trends in readmissions</li>
            <li><strong>Database Integration:</strong> Store and retrieve patient data efficiently for scalability</li>
            <li><strong>High Accuracy Models:</strong> Implement advanced techniques to achieve 90% prediction accuracy</li>
          </ul>
        </div>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Dataset</h2>
          <p>
            We utilized the Diabetes 130-US hospitals dataset from the UCI Machine Learning Repository, which includes:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Records:</strong> 101,766 patient encounters</li>
            <li><strong>Features:</strong> 50 columns including patient demographics, hospitalization details, medical history, and medications</li>
            <li><strong>Target Variable:</strong> Whether a patient was readmitted (&lt;30 days, &gt;30 days, or NO)</li>
          </ul>
          <p>
            This comprehensive dataset allows us to identify patterns and risk factors associated with hospital readmissions.
          </p>
        </div>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Technologies Used</h2>
          <div className="row" style={{ marginTop: '1rem' }}>
            <div className="col-4">
              <h3>Data Processing</h3>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Python</li>
                <li>Pandas</li>
                <li>NumPy</li>
                <li>Scikit-learn</li>
              </ul>
            </div>
            <div className="col-4">
              <h3>Machine Learning</h3>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>XGBoost</li>
                <li>Random Forest</li>
                <li>Logistic Regression</li>
                <li>Neural Networks</li>
              </ul>
            </div>
            <div className="col-4">
              <h3>Web Development</h3>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>Next.js</li>
                <li>React</li>
                <li>PostgreSQL</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Project Impact</h2>
          <p>
            Our Healthcare Readmission Predictive Analytics solution has the potential to:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li><strong>Reduce Healthcare Costs:</strong> By preventing unnecessary readmissions</li>
            <li><strong>Improve Patient Outcomes:</strong> Through targeted interventions for high-risk patients</li>
            <li><strong>Optimize Resource Allocation:</strong> By focusing care on patients who need it most</li>
            <li><strong>Enhance Quality Metrics:</strong> By reducing readmission rates, a key healthcare quality indicator</li>
            <li><strong>Support Data-Driven Decision Making:</strong> By providing actionable insights to healthcare providers</li>
          </ul>
        </div>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Future Directions</h2>
          <p>
            We plan to expand this project in several ways:
          </p>
          <ul style={{ paddingLeft: '1.5rem' }}>
            <li>Incorporate real-time data streams for continuous model updating</li>
            <li>Develop personalized intervention recommendations based on individual risk factors</li>
            <li>Integrate with electronic health record (EHR) systems for seamless deployment</li>
            <li>Expand to other medical conditions beyond diabetes</li>
            <li>Implement explainable AI techniques to increase model transparency</li>
          </ul>
        </div>
        
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Contact Information</h2>
          <p>
            For more information about this project, please contact:
          </p>
          <p>
            <strong>Email:</strong> info@healthcare-analytics-project.com<br />
            <strong>GitHub:</strong> github.com/healthcare-analytics-project
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
