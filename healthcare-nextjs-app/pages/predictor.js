import React, { useState } from 'react';
import Layout from '../components/Layout';
import theme from '../styles/theme';

export default function Predictor() {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    age: 65,
    gender: 'Male',
    race: 'Caucasian',
    timeInHospital: 5,
    numPreviousVisits: 1,
    numDiagnoses: 7,
    numMedications: 15,
    diabetesMed: true,
    insulin: false,
    emergencyAdmission: false,
    a1cTest: true,
    glucoseTest: true
  });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value)
    });
  };

  const handleReset = () => {
    setFormData({
      age: 65,
      gender: 'Male',
      race: 'Caucasian',
      timeInHospital: 5,
      numPreviousVisits: 1,
      numDiagnoses: 7,
      numMedications: 15,
      diabetesMed: true,
      insulin: false,
      emergencyAdmission: false,
      a1cTest: true,
      glucoseTest: true
    });
    setPrediction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate risk score based on form data (simplified example)
      const ageRisk = formData.age > 70 ? 20 : formData.age > 50 ? 15 : formData.age > 30 ? 10 : 5;
      const visitRisk = formData.numPreviousVisits * 5;
      const diagnosisRisk = formData.numDiagnoses * 2;
      const medicationRisk = formData.numMedications * 0.5;
      const stayRisk = formData.timeInHospital * 2;
      const emergencyRisk = formData.emergencyAdmission ? 10 : 0;
      
      const totalRisk = ageRisk + visitRisk + diagnosisRisk + medicationRisk + stayRisk + emergencyRisk;
      const riskScore = Math.min(Math.round(totalRisk), 100);
      
      // Determine risk level
      let riskLevel;
      if (riskScore < 30) riskLevel = 'LOW RISK';
      else if (riskScore < 60) riskLevel = 'MEDIUM RISK';
      else riskLevel = 'HIGH RISK';
      
      // Generate risk factors
      const riskFactors = [];
      
      if (formData.age > 70) {
        riskFactors.push({
          factor: 'Advanced Age',
          description: `Patient is ${formData.age} years old, increasing readmission risk.`,
          impact: 'HIGH'
        });
      }
      
      if (formData.numPreviousVisits > 0) {
        riskFactors.push({
          factor: 'Previous Inpatient Visits',
          description: `Patient has ${formData.numPreviousVisits} previous inpatient visits.`,
          impact: 'MEDIUM'
        });
      }
      
      if (formData.numDiagnoses > 5) {
        riskFactors.push({
          factor: 'Multiple Diagnoses',
          description: `Patient has ${formData.numDiagnoses} diagnoses.`,
          impact: 'MEDIUM'
        });
      }
      
      if (formData.numMedications > 10) {
        riskFactors.push({
          factor: 'Multiple Medications',
          description: `Patient is on ${formData.numMedications} medications, increasing risk of interactions.`,
          impact: 'MEDIUM'
        });
      }
      
      if (formData.timeInHospital > 7) {
        riskFactors.push({
          factor: 'Extended Hospital Stay',
          description: `Patient's hospital stay of ${formData.timeInHospital} days increases readmission risk.`,
          impact: 'MEDIUM'
        });
      }
      
      if (formData.emergencyAdmission) {
        riskFactors.push({
          factor: 'Emergency Admission',
          description: 'Patient was admitted through emergency, indicating potential severity.',
          impact: 'HIGH'
        });
      }
      
      // Set prediction result
      setPrediction({
        score: riskScore,
        level: riskLevel,
        riskFactors: riskFactors
      });
    } catch (error) {
      console.error('Error predicting readmission risk:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout 
      title="Predictor" 
      description="Predict patient readmission risk using our advanced machine learning model"
    >
      <div className="hero-section">
        <div className="container">
          <h1>
            Readmission Risk Predictor
          </h1>
          <p className="lead">
            Enter patient information to predict the risk of hospital readmission
          </p>
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '-30px', marginBottom: '3rem' }}>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <h3>Patient Information</h3>
              
              <div style={{ display: 'flex', marginTop: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                <button 
                  className={`btn ${activeTab === 'basic' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ 
                    marginRight: '0.5rem', 
                    borderRadius: '4px 4px 0 0',
                    borderBottom: activeTab === 'basic' ? '2px solid #3498db' : 'none'
                  }}
                  onClick={() => setActiveTab('basic')}
                >
                  <i className="fas fa-user me-2"></i>
                  Basic Info
                </button>
                <button 
                  className={`btn ${activeTab === 'medical' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ 
                    marginRight: '0.5rem', 
                    borderRadius: '4px 4px 0 0',
                    borderBottom: activeTab === 'medical' ? '2px solid #3498db' : 'none'
                  }}
                  onClick={() => setActiveTab('medical')}
                >
                  <i className="fas fa-heartbeat me-2"></i>
                  Medical History
                </button>
                <button 
                  className={`btn ${activeTab === 'advanced' ? 'btn-primary' : 'btn-outline'}`}
                  style={{ 
                    borderRadius: '4px 4px 0 0',
                    borderBottom: activeTab === 'advanced' ? '2px solid #3498db' : 'none'
                  }}
                  onClick={() => setActiveTab('advanced')}
                >
                  <i className="fas fa-cog me-2"></i>
                  Advanced
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                {activeTab === 'basic' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Age</label>
                      <div className="range-slider">
                        <input 
                          type="range" 
                          name="age" 
                          min="0" 
                          max="100" 
                          value={formData.age} 
                          onChange={handleSliderChange}
                        />
                        <div style={{ textAlign: 'center' }}>{formData.age} years</div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Gender</label>
                      <select 
                        className="form-select" 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleInputChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Race</label>
                      <select 
                        className="form-select" 
                        name="race" 
                        value={formData.race} 
                        onChange={handleInputChange}
                      >
                        <option value="Caucasian">Caucasian</option>
                        <option value="African American">African American</option>
                        <option value="Asian">Asian</option>
                        <option value="Hispanic">Hispanic</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Time in Hospital (days)</label>
                      <div className="range-slider">
                        <input 
                          type="range" 
                          name="timeInHospital" 
                          min="1" 
                          max="14" 
                          value={formData.timeInHospital} 
                          onChange={handleSliderChange}
                        />
                        <div style={{ textAlign: 'center' }}>{formData.timeInHospital} days</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'medical' && (
                  <div>
                    <div className="form-group">
                      <label className="form-label">Number of Previous Inpatient Visits</label>
                      <div className="range-slider">
                        <input 
                          type="range" 
                          name="numPreviousVisits" 
                          min="0" 
                          max="10" 
                          value={formData.numPreviousVisits} 
                          onChange={handleSliderChange}
                        />
                        <div style={{ textAlign: 'center' }}>{formData.numPreviousVisits}</div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Number of Diagnoses</label>
                      <div className="range-slider">
                        <input 
                          type="range" 
                          name="numDiagnoses" 
                          min="1" 
                          max="15" 
                          value={formData.numDiagnoses} 
                          onChange={handleSliderChange}
                        />
                        <div style={{ textAlign: 'center' }}>{formData.numDiagnoses}</div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Number of Medications</label>
                      <div className="range-slider">
                        <input 
                          type="range" 
                          name="numMedications" 
                          min="0" 
                          max="30" 
                          value={formData.numMedications} 
                          onChange={handleSliderChange}
                        />
                        <div style={{ textAlign: 'center' }}>{formData.numMedications}</div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                          type="checkbox" 
                          id="diabetesMed" 
                          name="diabetesMed" 
                          checked={formData.diabetesMed} 
                          onChange={handleInputChange}
                          style={{ marginRight: '0.5rem' }}
                        />
                        <label htmlFor="diabetesMed">Diabetes Medication</label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                          type="checkbox" 
                          id="insulin" 
                          name="insulin" 
                          checked={formData.insulin} 
                          onChange={handleInputChange}
                          style={{ marginRight: '0.5rem' }}
                        />
                        <label htmlFor="insulin">Insulin Treatment</label>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'advanced' && (
                  <div>
                    <div className="form-group">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                          type="checkbox" 
                          id="emergencyAdmission" 
                          name="emergencyAdmission" 
                          checked={formData.emergencyAdmission} 
                          onChange={handleInputChange}
                          style={{ marginRight: '0.5rem' }}
                        />
                        <label htmlFor="emergencyAdmission">Emergency Admission</label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                          type="checkbox" 
                          id="a1cTest" 
                          name="a1cTest" 
                          checked={formData.a1cTest} 
                          onChange={handleInputChange}
                          style={{ marginRight: '0.5rem' }}
                        />
                        <label htmlFor="a1cTest">A1C Test Performed</label>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input 
                          type="checkbox" 
                          id="glucoseTest" 
                          name="glucoseTest" 
                          checked={formData.glucoseTest} 
                          onChange={handleInputChange}
                          style={{ marginRight: '0.5rem' }}
                        />
                        <label htmlFor="glucoseTest">Glucose Test Performed</label>
                      </div>
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={handleReset}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <i className="fas fa-undo me-2"></i>
                    Reset
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={isLoading}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {isLoading ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: '50%',
                          borderTopColor: 'white',
                          animation: 'spin 1s ease-in-out infinite',
                          marginRight: '0.5rem'
                        }}></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-calculator me-2"></i>
                        Predict Readmission Risk
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="col-6">
            {prediction ? (
              <div className="card">
                <h3>Readmission Risk Assessment</h3>
                
                <div style={{ 
                  textAlign: 'center', 
                  marginTop: '2rem', 
                  marginBottom: '2rem' 
                }}>
                  <div style={{ 
                    fontSize: '4rem', 
                    fontWeight: 'bold',
                    color: prediction.score < 30 ? '#2ecc71' : 
                           prediction.score < 60 ? '#f39c12' : '#e74c3c'
                  }}>
                    {prediction.score}%
                  </div>
                  <div style={{ 
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    backgroundColor: prediction.score < 30 ? '#2ecc7120' : 
                                     prediction.score < 60 ? '#f39c1220' : '#e74c3c20',
                    color: prediction.score < 30 ? '#2ecc71' : 
                           prediction.score < 60 ? '#f39c12' : '#e74c3c',
                    fontWeight: 'bold',
                    marginTop: '0.5rem'
                  }}>
                    {prediction.level}
                  </div>
                </div>
                
                <h4>Key Risk Factors</h4>
                
                {prediction.riskFactors.length > 0 ? (
                  <div style={{ marginTop: '1rem' }}>
                    {prediction.riskFactors.map((factor, index) => (
                      <div key={index} style={{ 
                        padding: '1rem',
                        marginBottom: '1rem',
                        borderRadius: '8px',
                        backgroundColor: factor.impact === 'HIGH' ? '#e74c3c10' : '#f39c1210',
                        borderLeft: `4px solid ${factor.impact === 'HIGH' ? '#e74c3c' : '#f39c12'}`
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem'
                        }}>
                          <h5 style={{ margin: 0 }}>{factor.factor}</h5>
                          <span style={{ 
                            padding: '0.25rem 0.5rem',
                            borderRadius: '20px',
                            backgroundColor: factor.impact === 'HIGH' ? '#e74c3c20' : '#f39c1220',
                            color: factor.impact === 'HIGH' ? '#e74c3c' : '#f39c12',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}>
                            {factor.impact} IMPACT
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{factor.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No significant risk factors identified.</p>
                )}
                
                <div style={{ 
                  marginTop: '2rem',
                  padding: '1rem',
                  borderRadius: '8px',
                  backgroundColor: '#3498db10',
                  borderLeft: '4px solid #3498db'
                }}>
                  <h5 style={{ color: '#3498db' }}>Recommended Interventions</h5>
                  <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                    {prediction.score >= 60 ? (
                      <>
                        <li>Schedule follow-up appointment within 7 days of discharge</li>
                        <li>Implement comprehensive medication reconciliation</li>
                        <li>Assign case manager for post-discharge coordination</li>
                        <li>Provide enhanced patient education on warning signs</li>
                        <li>Consider home health services</li>
                      </>
                    ) : prediction.score >= 30 ? (
                      <>
                        <li>Schedule follow-up appointment within 14 days of discharge</li>
                        <li>Conduct medication review before discharge</li>
                        <li>Provide patient education on self-management</li>
                        <li>Ensure clear communication of discharge instructions</li>
                      </>
                    ) : (
                      <>
                        <li>Schedule routine follow-up appointment</li>
                        <li>Provide standard discharge instructions</li>
                        <li>Ensure patient has access to prescribed medications</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="card" style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                padding: '3rem',
                height: '100%'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <i className="fas fa-user-md" style={{ fontSize: '2rem', color: '#3498db' }}></i>
                </div>
                <h3>Enter Patient Information</h3>
                <p style={{ textAlign: 'center', maxWidth: '400px', margin: '1rem 0' }}>
                  Fill out the patient information form and click "Predict Readmission Risk" to get a personalized risk assessment and intervention recommendations.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  {['Age', 'Gender', 'Diagnoses', 'Medications', 'Hospital Stay'].map((item, index) => (
                    <div key={index} style={{ 
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      backgroundColor: '#f8f9fa',
                      fontSize: '0.9rem'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
