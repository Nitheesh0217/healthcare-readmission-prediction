from flask import Flask, render_template, request, jsonify, url_for, redirect
import pandas as pd
import numpy as np
import pickle
import os
import json

app = Flask(__name__, static_folder='static')

# Load model (in a real application)
# model = pickle.load(open('models/readmission_model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/dashboard/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/predictor/')
def predictor():
    return render_template('predictor.html')

@app.route('/methodology/')
def methodology():
    return render_template('methodology.html')

@app.route('/about/')
def about():
    return render_template('about.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get form data
        age = int(request.form.get('age'))
        gender = int(request.form.get('gender'))
        race = int(request.form.get('race'))
        time_in_hospital = int(request.form.get('time_in_hospital'))
        num_lab_procedures = int(request.form.get('num_lab_procedures'))
        num_procedures = int(request.form.get('num_procedures'))
        num_medications = int(request.form.get('num_medications'))
        number_outpatient = int(request.form.get('number_outpatient'))
        number_emergency = int(request.form.get('number_emergency'))
        number_inpatient = int(request.form.get('number_inpatient'))
        number_diagnoses = int(request.form.get('number_diagnoses'))
        max_glu_serum = int(request.form.get('max_glu_serum'))
        a1c_result = int(request.form.get('a1c_result'))
        admission_type = int(request.form.get('admission_type'))
        discharge_disposition = int(request.form.get('discharge_disposition'))
        admission_source = int(request.form.get('admission_source'))
        
        # In a real application, we would use the model to make a prediction
        # prediction = model.predict([[age, gender, race, time_in_hospital, ...]])
        
        # For demonstration, we'll use a simple rule-based approach
        risk_score = 0
        
        # Age factor (higher age = higher risk)
        if age < 30:
            risk_score += 10
        elif age < 50:
            risk_score += 20
        elif age < 70:
            risk_score += 30
        else:
            risk_score += 40
        
        # Number of diagnoses factor
        risk_score += number_diagnoses * 5
        
        # Time in hospital factor
        risk_score += time_in_hospital * 3
        
        # Number of inpatient visits factor
        risk_score += number_inpatient * 10
        
        # Normalize to 0-100
        risk_score = min(max(risk_score, 0), 100)
        
        # Determine risk level
        if risk_score < 30:
            risk_level = 'Low'
            risk_color = '#4CAF50'
            prediction = 0
        elif risk_score < 60:
            risk_level = 'Medium'
            risk_color = '#FFC107'
            prediction = 1 if risk_score > 45 else 0
        else:
            risk_level = 'High'
            risk_color = '#F44336'
            prediction = 1
        
        # Determine risk factors
        risk_factors = []
        if age >= 70:
            risk_factors.append('Advanced age (over 70 years)')
        if number_diagnoses >= 9:
            risk_factors.append('High number of diagnoses (9+)')
        if time_in_hospital >= 8:
            risk_factors.append('Extended hospital stay (8+ days)')
        if number_inpatient >= 2:
            risk_factors.append('Multiple previous inpatient visits')
        
        # Determine interventions
        interventions = []
        if prediction == 1:
            interventions.append('Schedule follow-up appointment within 7 days of discharge')
            interventions.append('Provide detailed medication reconciliation and education')
            
            if number_diagnoses >= 9:
                interventions.append('Coordinate care with specialists for multiple conditions')
            
            if age >= 70:
                interventions.append('Arrange home health services for post-discharge support')
            
            if time_in_hospital >= 8:
                interventions.append('Implement comprehensive discharge planning with social work consultation')
            
            if number_inpatient >= 2:
                interventions.append('Enroll in chronic care management program')
        else:
            interventions.append('Standard follow-up appointment within 30 days')
            interventions.append('Provide discharge instructions and medication list')
        
        # Return prediction results
        return jsonify({
            'prediction': prediction,
            'probability': risk_score,
            'risk_level': risk_level,
            'risk_color': risk_color,
            'risk_factors': risk_factors,
            'interventions': interventions
        })
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
