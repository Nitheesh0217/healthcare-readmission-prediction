
# Exploratory Data Analysis - Key Findings

## Readmission Distribution
- Overall readmission rate: 46.09%
- Total patients: 305,298
- Readmitted patients: 140,706
- Non-readmitted patients: 164,592

## Demographic Factors
### Age
- Readmission rates increase with age
- Highest readmission rate: 47.69% for patients over 70
- Lowest readmission rate: 41.41% for patients under 30

### Gender
- Male readmission rate: 45.12%
- Female readmission rate: 46.92%

### Race
- Highest readmission rate by race: 46.50% for Caucasian
- Lowest readmission rate by race: 35.26% for Asian

## Clinical Factors
### Time in Hospital
- Strong positive correlation with readmission (r = 0.0513)
- Patients staying 14 days have 50.42% readmission rate vs 39.65% for 1-day stays

### Number of Diagnoses
- Strong positive correlation with readmission (r = 0.1126)
- Patients with 8+ diagnoses have 48.98% higher readmission rates

### Number of Medications
- Moderate correlation with readmission (r = 0.0468)
- Readmission rate increases with number of medications

## Top Predictive Factors
1. Time in hospital (r = 0.0513)
2. Number of diagnoses (r = 0.1126)
3. Number of procedures (r = -0.0447)
4. Number of medications (r = 0.0468)
5. Age (r = 0.0304)

## Recommendations for Modeling
- Focus on time in hospital, number of diagnoses, and age as key predictors
- Consider interaction effects between age and clinical factors
- Address class imbalance in the readmission target variable
- Explore non-linear relationships, especially with number of medications
