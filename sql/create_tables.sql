-- Create database for Healthcare Readmission Predictive Analytics
CREATE DATABASE IF NOT EXISTS healthcare_readmission;

-- Use the database
USE healthcare_readmission;

-- Create table for patient data
CREATE TABLE patient_readmission (
    id SERIAL PRIMARY KEY,
    encounter_id BIGINT,
    patient_nbr BIGINT,
    age INT,
    gender VARCHAR(20),
    race VARCHAR(50),
    admission_type_id INT,
    discharge_disposition_id INT,
    admission_source_id INT,
    time_in_hospital INT,
    num_lab_procedures INT,
    num_procedures INT,
    num_medications INT,
    number_outpatient INT,
    number_emergency INT,
    number_inpatient INT,
    number_diagnoses INT,
    max_glu_serum VARCHAR(10),
    a1c_result VARCHAR(10),
    readmitted BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create table for admission types
CREATE TABLE admission_types (
    admission_type_id INT PRIMARY KEY,
    description VARCHAR(255)
);

-- Create table for discharge dispositions
CREATE TABLE discharge_dispositions (
    discharge_disposition_id INT PRIMARY KEY,
    description VARCHAR(255)
);

-- Create table for admission sources
CREATE TABLE admission_sources (
    admission_source_id INT PRIMARY KEY,
    description VARCHAR(255)
);

-- Create table for model predictions
CREATE TABLE model_predictions (
    id SERIAL PRIMARY KEY,
    patient_id BIGINT,
    prediction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    readmission_probability FLOAT,
    predicted_readmission BOOLEAN,
    model_version VARCHAR(50)
);

-- Create indexes for better query performance
CREATE INDEX idx_patient_nbr ON patient_readmission(patient_nbr);
CREATE INDEX idx_readmitted ON patient_readmission(readmitted);
CREATE INDEX idx_age ON patient_readmission(age);
CREATE INDEX idx_time_in_hospital ON patient_readmission(time_in_hospital);
CREATE INDEX idx_number_diagnoses ON patient_readmission(number_diagnoses);

-- Create view for readmission statistics by age group
CREATE VIEW readmission_by_age AS
SELECT 
    CASE 
        WHEN age < 30 THEN '<30'
        WHEN age BETWEEN 30 AND 50 THEN '30-50'
        WHEN age BETWEEN 51 AND 70 THEN '51-70'
        ELSE '>70'
    END AS age_group,
    COUNT(*) AS total_patients,
    SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) AS readmitted_count,
    (SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS readmission_rate
FROM patient_readmission
GROUP BY age_group
ORDER BY age_group;

-- Create view for readmission statistics by time in hospital
CREATE VIEW readmission_by_time AS
SELECT 
    time_in_hospital,
    COUNT(*) AS total_patients,
    SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) AS readmitted_count,
    (SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS readmission_rate
FROM patient_readmission
GROUP BY time_in_hospital
ORDER BY time_in_hospital;

-- Create view for readmission statistics by number of diagnoses
CREATE VIEW readmission_by_diagnoses AS
SELECT 
    number_diagnoses,
    COUNT(*) AS total_patients,
    SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) AS readmitted_count,
    (SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS readmission_rate
FROM patient_readmission
GROUP BY number_diagnoses
ORDER BY number_diagnoses;

-- Create stored procedure for high-risk patient identification
DELIMITER //
CREATE PROCEDURE identify_high_risk_patients()
BEGIN
    SELECT 
        id,
        patient_nbr,
        age,
        gender,
        race,
        time_in_hospital,
        number_diagnoses,
        number_inpatient,
        number_emergency
    FROM patient_readmission
    WHERE 
        (age > 70 OR
        number_diagnoses >= 9 OR
        time_in_hospital >= 8 OR
        number_inpatient >= 2)
        AND readmitted = FALSE
    ORDER BY 
        number_inpatient DESC,
        number_diagnoses DESC,
        age DESC;
END //
DELIMITER ;

-- Create stored procedure for readmission trend analysis
DELIMITER //
CREATE PROCEDURE readmission_trend_analysis()
BEGIN
    SELECT 
        YEAR(created_at) AS year,
        MONTH(created_at) AS month,
        COUNT(*) AS total_patients,
        SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) AS readmitted_count,
        (SUM(CASE WHEN readmitted = TRUE THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS readmission_rate
    FROM patient_readmission
    GROUP BY YEAR(created_at), MONTH(created_at)
    ORDER BY YEAR(created_at), MONTH(created_at);
END //
DELIMITER ;
