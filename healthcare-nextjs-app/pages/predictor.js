import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import LinkButton from '../components/LinkButton';
import theme from '../styles/theme';

export default function Predictor() {
  const [formData, setFormData] = useState({
    age: 65,
    gender: 0, // 0: Male, 1: Female
    race: 0, // 0: Caucasian, 1: African American, 2: Other
    time_in_hospital: 5,
    num_lab_procedures: 45,
    num_procedures: 1,
    num_medications: 15,
    number_outpatient: 0,
    number_emergency: 0,
    number_inpatient: 1,
    number_diagnoses: 7,
    max_glu_serum: 0, // 0: None, 1: Norm, 2: >200, 3: >300
    a1c_result: 0, // 0: None, 1: Norm, 2: >7, 3: >8
    admission_type: 1, // 1: Emergency, 2: Urgent, 3: Elective
    discharge_disposition: 1, // 1: Home, etc.
    admission_source: 7 // 7: Emergency Room
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value)
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // This is a simplified prediction logic similar to the Flask app
      let risk_score = 0;
      
      // Age factor
      if (formData.age < 30) risk_score += 10;
      else if (formData.age < 50) risk_score += 20;
      else if (formData.age < 70) risk_score += 30;
      else risk_score += 40;
      
      // Number of diagnoses factor
      risk_score += formData.number_diagnoses * 5;
      
      // Time in hospital factor
      risk_score += formData.time_in_hospital * 3;
      
      // Number of inpatient visits factor
      risk_score += formData.number_inpatient * 10;
      
      // Normalize to 0-100
      risk_score = Math.min(Math.max(risk_score, 0), 100);
      
      // Determine risk level
      let risk_level, risk_color, prediction_value;
      if (risk_score < 30) {
        risk_level = 'Low';
        risk_color = theme.colors.success;
        prediction_value = 0;
      } else if (risk_score < 60) {
        risk_level = 'Medium';
        risk_color = theme.colors.warning;
        prediction_value = risk_score > 45 ? 1 : 0;
      } else {
        risk_level = 'High';
        risk_color = theme.colors.danger;
        prediction_value = 1;
      }
      
      // Determine risk factors
      const risk_factors = [];
      if (formData.age >= 70) risk_factors.push('Advanced age (over 70 years)');
      if (formData.number_diagnoses >= 9) risk_factors.push('High number of diagnoses (9+)');
      if (formData.time_in_hospital >= 8) risk_factors.push('Extended hospital stay (8+ days)');
      if (formData.number_inpatient >= 2) risk_factors.push('Multiple previous inpatient visits');
      
      // Determine interventions
      const interventions = [];
      if (prediction_value === 1) {
        interventions.push('Schedule follow-up appointment within 7 days of discharge');
        interventions.push('Provide detailed medication reconciliation and education');
        
        if (formData.number_diagnoses >= 9) {
          interventions.push('Coordinate care with specialists for multiple conditions');
        }
        
        if (formData.age >= 70) {
          interventions.push('Arrange home health services for post-discharge support');
        }
        
        if (formData.time_in_hospital >= 8) {
          interventions.push('Implement comprehensive discharge planning with social work consultation');
        }
        
        if (formData.number_inpatient >= 2) {
          interventions.push('Enroll in chronic care management program');
        }
      } else {
        interventions.push('Standard follow-up appointment within 30 days');
        interventions.push('Provide discharge instructions and medication list');
      }
      
      setPrediction({
        prediction: prediction_value,
        probability: risk_score,
        risk_level,
        risk_color,
        risk_factors,
        interventions
      });
      
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div>
      <Navbar />
      <Breadcrumb />
      
      <div className="container" style={{ padding: '1rem 0 3rem' }}>
        <h1>Readmission Risk Predictor</h1>
        <p className="lead">Enter patient information to predict readmission risk</p>
        
        <div className="row" style={{ marginTop: '2rem' }}>
          <div className="col-6">
            <div className="card">
              <h3>Patient Information</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="age" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Age</label>
                  <input 
                    type="number" 
                    id="age" 
                    name="age" 
                    value={formData.age} 
                    onChange={handleChange} 
                    min="0" 
                    max="100"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="gender" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Gender</label>
                  <select 
                    id="gender" 
                    name="gender" 
                    value={formData.gender} 
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  >
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="time_in_hospital" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Time in Hospital (days)</label>
                  <input 
                    type="number" 
                    id="time_in_hospital" 
                    name="time_in_hospital" 
                    value={formData.time_in_hospital} 
                    onChange={handleChange} 
                    min="1" 
                    max="30"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="number_diagnoses" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Number of Diagnoses</label>
                  <input 
                    type="number" 
                    id="number_diagnoses" 
                    name="number_diagnoses" 
                    value={formData.number_diagnoses} 
                    onChange={handleChange} 
                    min="1" 
                    max="20"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="number_inpatient" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Number of Previous Inpatient Visits</label>
                  <input 
                    type="number" 
                    id="number_inpatient" 
                    name="number_inpatient" 
                    value={formData.number_inpatient} 
                    onChange={handleChange} 
                    min="0" 
                    max="10"
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd' }}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ 
                    marginTop: '1rem', 
                    width: '100%', 
                    padding: '0.75rem',
                    backgroundColor: loading ? '#7f8c8d' : theme.colors.primary,
                    borderColor: loading ? '#7f8c8d' : theme.colors.primary,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin me-2"></i>
                      Calculating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-calculator me-2"></i>
                      Predict Readmission Risk
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="col-6">
            {prediction ? (
              <div className="card">
                <h3>Prediction Results</h3>
                
                <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Readmission Risk</div>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold', 
                    color: prediction.risk_color,
                    marginBottom: '0.5rem'
                  }}>
                    {prediction.risk_level}
                  </div>
                  <div style={{ fontSize: '1.2rem' }}>
                    Risk Score: {prediction.probability}%
                  </div>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h4>Risk Factors</h4>
                  {prediction.risk_factors.length > 0 ? (
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      {prediction.risk_factors.map((factor, index) => (
                        <li key={index}>{factor}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No significant risk factors identified.</p>
                  )}
                </div>
                
                <div>
                  <h4>Recommended Interventions</h4>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    {prediction.interventions.map((intervention, index) => (
                      <li key={index}>{intervention}</li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                  <LinkButton 
                    href="/dashboard" 
                    variant="outline"
                    icon="fa-chart-line"
                  >
                    View Analytics Dashboard
                  </LinkButton>
                </div>
              </div>
            ) : (
              <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <i className="fas fa-user-md" style={{ fontSize: '4rem', color: theme.colors.primary, marginBottom: '1.5rem' }}></i>
                <h3>Readmission Prediction</h3>
                <p style={{ textAlign: 'center' }}>Enter patient information and click "Predict Readmission Risk" to see results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
