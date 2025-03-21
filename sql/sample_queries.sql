-- Sample queries for Healthcare Readmission Analytics

-- 1. Overall readmission rate
SELECT 
    COUNT(*) AS total_patients,
    SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) AS readmitted_count,
    (SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS readmission_rate
FROM patient_readmission;

-- 2. Readmission rate by age group
SELECT * FROM readmission_by_age;

-- 3. Readmission rate by time in hospital
SELECT * FROM readmission_by_time;

-- 4. Readmission rate by number of diagnoses
SELECT * FROM readmission_by_diagnoses;

-- 5. Readmission rate by gender
SELECT 
    gender,
    COUNT(*) AS total_patients,
    SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) AS readmitted_count,
    (SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS readmission_rate
FROM patient_readmission
GROUP BY gender;

-- 6. Readmission rate by race
SELECT 
    race,
    COUNT(*) AS total_patients,
    SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) AS readmitted_count,
    (SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS readmission_rate
FROM patient_readmission
GROUP BY race;

-- 7. Readmission rate by admission type
SELECT 
    a.description AS admission_type,
    COUNT(*) AS total_patients,
    SUM(CASE WHEN p.readmitted = TRUE THEN 1 ELSE 0 END) AS readmitted_count,
    (SUM(CASE WHEN p.readmitted = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS readmission_rate
FROM patient_readmission p
JOIN admission_types a ON p.admission_type_id = a.admission_type_id
GROUP BY a.description
ORDER BY readmission_rate DESC;

-- 8. Identify patients with high risk of readmission
CALL identify_high_risk_patients();

-- 9. Readmission trend analysis
CALL readmission_trend_analysis();

-- 10. Top factors correlated with readmission
SELECT 
    'number_inpatient' AS factor,
    CORR(number_inpatient, CASE WHEN readmitted THEN 1 ELSE 0 END) AS correlation
FROM patient_readmission
UNION
SELECT 
    'number_diagnoses' AS factor,
    CORR(number_diagnoses, CASE WHEN readmitted THEN 1 ELSE 0 END) AS correlation
FROM patient_readmission
UNION
SELECT 
    'number_emergency' AS factor,
    CORR(number_emergency, CASE WHEN readmitted THEN 1 ELSE 0 END) AS correlation
FROM patient_readmission
UNION
SELECT 
    'time_in_hospital' AS factor,
    CORR(time_in_hospital, CASE WHEN readmitted THEN 1 ELSE 0 END) AS correlation
FROM patient_readmission
UNION
SELECT 
    'age' AS factor,
    CORR(age, CASE WHEN readmitted THEN 1 ELSE 0 END) AS correlation
FROM patient_readmission
ORDER BY correlation DESC;

-- 11. Model performance analysis
SELECT 
    model_version,
    COUNT(*) AS total_predictions,
    SUM(CASE WHEN predicted_readmission = TRUE THEN 1 ELSE 0 END) AS predicted_readmissions,
    AVG(readmission_probability) AS avg_probability
FROM model_predictions
GROUP BY model_version;

-- 12. Accuracy of predictions
SELECT 
    mp.model_version,
    COUNT(*) AS total_predictions,
    SUM(CASE WHEN mp.predicted_readmission = pr.readmitted THEN 1 ELSE 0 END) AS correct_predictions,
    (SUM(CASE WHEN mp.predicted_readmission = pr.readmitted THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS accuracy
FROM model_predictions mp
JOIN patient_readmission pr ON mp.patient_id = pr.patient_nbr
GROUP BY mp.model_version;
