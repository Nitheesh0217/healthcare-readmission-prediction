-- Insert sample data into admission_types table
INSERT INTO admission_types (admission_type_id, description) VALUES
(1, 'Emergency'),
(2, 'Urgent'),
(3, 'Elective'),
(4, 'Newborn'),
(5, 'Not Available'),
(6, 'NULL'),
(7, 'Trauma Center'),
(8, 'Not Mapped');

-- Insert sample data into discharge_dispositions table
INSERT INTO discharge_dispositions (discharge_disposition_id, description) VALUES
(1, 'Discharged to home'),
(2, 'Discharged/transferred to another short term hospital'),
(3, 'Discharged/transferred to SNF'),
(4, 'Discharged/transferred to ICF'),
(5, 'Discharged/transferred to another type of inpatient care institution'),
(6, 'Discharged/transferred to home with home health service'),
(7, 'Left AMA'),
(8, 'Discharged/transferred to home under care of Home IV provider'),
(9, 'Admitted as an inpatient to this hospital'),
(10, 'Neonate discharged to another hospital for neonatal aftercare'),
(11, 'Expired'),
(12, 'Still patient or expected to return for outpatient services'),
(13, 'Hospice / home'),
(14, 'Hospice / medical facility'),
(15, 'Discharged/transferred within this institution to Medicare approved swing bed'),
(16, 'Discharged/transferred/referred another institution for outpatient services'),
(17, 'Discharged/transferred/referred to this institution for outpatient services'),
(18, 'NULL'),
(19, 'Expired at home. Medicaid only, hospice'),
(20, 'Expired in a medical facility. Medicaid only, hospice'),
(21, 'Expired, place unknown. Medicaid only, hospice'),
(22, 'Discharged/transferred to another rehab facility including rehab units of a hospital'),
(23, 'Discharged/transferred to a long term care hospital'),
(24, 'Discharged/transferred to a nursing facility certified under Medicaid but not certified under Medicare'),
(25, 'Not Mapped'),
(26, 'Unknown/Invalid');

-- Insert sample data into admission_sources table
INSERT INTO admission_sources (admission_source_id, description) VALUES
(1, 'Physician Referral'),
(2, 'Clinic Referral'),
(3, 'HMO Referral'),
(4, 'Transfer from a hospital'),
(5, 'Transfer from a Skilled Nursing Facility (SNF)'),
(6, 'Transfer from another health care facility'),
(7, 'Emergency Room'),
(8, 'Court/Law Enforcement'),
(9, 'Not Available'),
(10, 'Transfer from critial access hospital'),
(11, 'Normal Delivery'),
(12, 'Premature Delivery'),
(13, 'Sick Baby'),
(14, 'Extramural Birth'),
(15, 'Not Available'),
(16, 'NULL'),
(17, 'Transfer From Another Home Health Agency'),
(18, 'Readmission to Same Home Health Agency'),
(19, 'Not Mapped'),
(20, 'Unknown/Invalid'),
(21, 'Transfer from hospital inpt/same fac reslt in a sep claim'),
(22, 'Transfer from Ambulatory Surgery Center'),
(23, 'Born inside this hospital'),
(24, 'Born outside this hospital'),
(25, 'Transfer from Hospice'),
(26, 'Transfer from Ambulatory Surgery Center');

-- Insert sample patient data (first 10 records)
INSERT INTO patient_readmission (
    encounter_id, patient_nbr, age, gender, race, 
    admission_type_id, discharge_disposition_id, admission_source_id,
    time_in_hospital, num_lab_procedures, num_procedures, num_medications,
    number_outpatient, number_emergency, number_inpatient, number_diagnoses,
    max_glu_serum, a1c_result, readmitted
) VALUES
(2278392, 8222157, 75, 'Female', 'Caucasian', 1, 1, 7, 8, 43, 0, 16, 0, 0, 0, 9, 'None', 'None', TRUE),
(149190, 55629189, 40, 'Male', 'Caucasian', 1, 1, 7, 1, 35, 1, 7, 0, 0, 0, 6, 'None', 'None', FALSE),
(64410, 86047875, 69, 'Female', 'Caucasian', 1, 1, 7, 3, 44, 1, 18, 2, 0, 1, 9, 'None', 'None', FALSE),
(500364, 82442376, 70, 'Male', 'Caucasian', 1, 1, 7, 2, 57, 0, 3, 0, 0, 0, 7, 'None', 'None', FALSE),
(16680, 42519267, 69, 'Male', 'Caucasian', 1, 1, 7, 1, 18, 0, 17, 0, 0, 0, 7, 'None', 'None', FALSE),
(35754, 82637451, 80, 'Male', 'Caucasian', 1, 1, 7, 3, 19, 0, 15, 0, 0, 0, 5, 'None', 'None', FALSE),
(55842, 84259809, 54, 'Male', 'Caucasian', 1, 1, 7, 1, 21, 1, 11, 0, 0, 0, 5, 'None', 'None', FALSE),
(57996, 88548212, 71, 'Male', 'Caucasian', 1, 1, 7, 1, 51, 0, 9, 0, 0, 0, 5, 'None', 'None', FALSE),
(63730, 52492562, 38, 'Female', 'Caucasian', 1, 1, 7, 2, 44, 1, 16, 0, 0, 0, 9, 'None', 'None', FALSE),
(67968, 41256262, 87, 'Female', 'Caucasian', 1, 1, 7, 6, 53, 0, 24, 0, 0, 0, 9, 'None', 'None', FALSE);

-- Insert sample model predictions
INSERT INTO model_predictions (
    patient_id, prediction_date, readmission_probability, predicted_readmission, model_version
) VALUES
(8222157, '2025-01-15 10:30:00', 0.78, TRUE, 'XGBoost v1.0'),
(55629189, '2025-01-15 10:35:00', 0.23, FALSE, 'XGBoost v1.0'),
(86047875, '2025-01-15 10:40:00', 0.45, FALSE, 'XGBoost v1.0'),
(82442376, '2025-01-15 10:45:00', 0.67, TRUE, 'XGBoost v1.0'),
(42519267, '2025-01-15 10:50:00', 0.32, FALSE, 'XGBoost v1.0'),
(82637451, '2025-01-15 10:55:00', 0.85, TRUE, 'XGBoost v1.0'),
(84259809, '2025-01-15 11:00:00', 0.28, FALSE, 'XGBoost v1.0'),
(88548212, '2025-01-15 11:05:00', 0.56, TRUE, 'XGBoost v1.0'),
(52492562, '2025-01-15 11:10:00', 0.19, FALSE, 'XGBoost v1.0'),
(41256262, '2025-01-15 11:15:00', 0.92, TRUE, 'XGBoost v1.0');
