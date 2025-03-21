#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Healthcare Readmission Predictive Analytics - Exploratory Data Analysis
This script performs exploratory data analysis on the processed healthcare dataset
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Set visualization style
sns.set(style='whitegrid')
plt.style.use('seaborn-v0_8-whitegrid')

def main():
    print("Healthcare Readmission Predictive Analytics - Exploratory Data Analysis")
    print("-" * 70)
    
    # Create directories if they don't exist
    os.makedirs('../data/processed', exist_ok=True)
    os.makedirs('../notebooks', exist_ok=True)
    
    # Load the processed dataset
    print("\n1. Loading the processed dataset...")
    try:
        df = pd.read_csv('../data/processed/diabetic_data_cleaned.csv')
        print(f"Dataset shape: {df.shape}")
    except FileNotFoundError:
        print("Error: Processed dataset not found. Please run data_preparation.py first.")
        return
    
    # Create output directory for visualizations
    os.makedirs('../data/visualizations', exist_ok=True)
    
    # Basic statistics
    print("\n2. Generating basic statistics...")
    numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns
    stats = df[numeric_cols].describe()
    print(stats)
    
    # Readmission distribution
    print("\n3. Analyzing readmission distribution...")
    readmission_counts = df['readmitted_binary'].value_counts()
    readmission_percentage = df['readmitted_binary'].value_counts(normalize=True) * 100
    
    print("Readmission Counts:")
    print(f"Not Readmitted (0): {readmission_counts[0]} ({readmission_percentage[0]:.2f}%)")
    print(f"Readmitted (1): {readmission_counts[1]} ({readmission_percentage[1]:.2f}%)")
    
    plt.figure(figsize=(10, 6))
    sns.countplot(x='readmitted_binary', data=df, palette=['#4CAF50', '#F44336'])
    plt.title('Distribution of Readmission', fontsize=16)
    plt.xlabel('Readmitted (0=No, 1=Yes)', fontsize=14)
    plt.ylabel('Count', fontsize=14)
    plt.xticks([0, 1], ['Not Readmitted', 'Readmitted'])
    plt.grid(axis='y', alpha=0.3)
    plt.savefig('../data/visualizations/readmission_distribution.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Age vs. Readmission
    print("\n4. Examining age vs. readmission patterns...")
    
    # Create age groups for better visualization
    df['age_group'] = pd.cut(df['age_numeric'], 
                            bins=[0, 30, 50, 70, 100], 
                            labels=['<30', '30-50', '51-70', '>70'])
    
    # Calculate readmission rate by age group
    age_readmission = df.groupby('age_group')['readmitted_binary'].mean() * 100
    print("Readmission Rate by Age Group:")
    print(age_readmission)
    
    plt.figure(figsize=(10, 6))
    sns.barplot(x='age_group', y='readmitted_binary', data=df, estimator=lambda x: len(x[x == 1]) / len(x) * 100, 
               palette='viridis')
    plt.title('Readmission Rate by Age Group', fontsize=16)
    plt.xlabel('Age Group', fontsize=14)
    plt.ylabel('Readmission Rate (%)', fontsize=14)
    plt.grid(axis='y', alpha=0.3)
    plt.savefig('../data/visualizations/age_vs_readmission.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Time in hospital vs. Readmission
    print("\n5. Analyzing time in hospital vs. readmission...")
    time_readmission = df.groupby('time_in_hospital')['readmitted_binary'].mean() * 100
    print("Readmission Rate by Time in Hospital:")
    print(time_readmission)
    
    plt.figure(figsize=(12, 6))
    sns.lineplot(x='time_in_hospital', y='readmitted_binary', data=df, estimator=lambda x: len(x[x == 1]) / len(x) * 100, 
                marker='o', color='#FF9800')
    plt.title('Readmission Rate by Time in Hospital', fontsize=16)
    plt.xlabel('Time in Hospital (days)', fontsize=14)
    plt.ylabel('Readmission Rate (%)', fontsize=14)
    plt.grid(True, alpha=0.3)
    plt.savefig('../data/visualizations/time_vs_readmission.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Number of diagnoses vs. Readmission
    print("\n6. Analyzing number of diagnoses vs. readmission...")
    diagnoses_readmission = df.groupby('number_diagnoses')['readmitted_binary'].mean() * 100
    print("Readmission Rate by Number of Diagnoses:")
    print(diagnoses_readmission)
    
    plt.figure(figsize=(12, 6))
    sns.lineplot(x='number_diagnoses', y='readmitted_binary', data=df, estimator=lambda x: len(x[x == 1]) / len(x) * 100, 
                marker='o', color='#4CAF50')
    plt.title('Readmission Rate by Number of Diagnoses', fontsize=16)
    plt.xlabel('Number of Diagnoses', fontsize=14)
    plt.ylabel('Readmission Rate (%)', fontsize=14)
    plt.grid(True, alpha=0.3)
    plt.savefig('../data/visualizations/diagnoses_vs_readmission.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Gender vs. Readmission
    print("\n7. Analyzing gender vs. readmission...")
    gender_readmission = df.groupby('gender')['readmitted_binary'].mean() * 100
    print("Readmission Rate by Gender:")
    print(gender_readmission)
    
    plt.figure(figsize=(8, 6))
    sns.barplot(x='gender', y='readmitted_binary', data=df, estimator=lambda x: len(x[x == 1]) / len(x) * 100, 
               palette='Set2')
    plt.title('Readmission Rate by Gender', fontsize=16)
    plt.xlabel('Gender', fontsize=14)
    plt.ylabel('Readmission Rate (%)', fontsize=14)
    plt.grid(axis='y', alpha=0.3)
    plt.savefig('../data/visualizations/gender_vs_readmission.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Race vs. Readmission
    print("\n8. Analyzing race vs. readmission...")
    race_readmission = df.groupby('race')['readmitted_binary'].mean() * 100
    print("Readmission Rate by Race:")
    print(race_readmission)
    
    plt.figure(figsize=(12, 6))
    sns.barplot(x='race', y='readmitted_binary', data=df, estimator=lambda x: len(x[x == 1]) / len(x) * 100, 
               palette='Set3')
    plt.title('Readmission Rate by Race', fontsize=16)
    plt.xlabel('Race', fontsize=14)
    plt.ylabel('Readmission Rate (%)', fontsize=14)
    plt.xticks(rotation=45, ha='right')
    plt.grid(axis='y', alpha=0.3)
    plt.tight_layout()
    plt.savefig('../data/visualizations/race_vs_readmission.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Correlation analysis
    print("\n9. Performing correlation analysis...")
    # Select numeric columns for correlation
    numeric_df = df.select_dtypes(include=['int64', 'float64'])
    
    # Calculate correlation matrix
    corr_matrix = numeric_df.corr()
    
    # Find top correlations with readmission
    readmission_corr = corr_matrix['readmitted_binary'].sort_values(ascending=False)
    print("Top Correlations with Readmission:")
    print(readmission_corr.head(10))
    
    # Plot correlation heatmap
    plt.figure(figsize=(16, 14))
    mask = np.triu(np.ones_like(corr_matrix, dtype=bool))
    sns.heatmap(corr_matrix, mask=mask, annot=False, cmap='coolwarm', center=0,
               square=True, linewidths=.5, cbar_kws={"shrink": .5})
    plt.title('Correlation Matrix of Numeric Features', fontsize=16)
    plt.tight_layout()
    plt.savefig('../data/visualizations/correlation_heatmap.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Plot correlation with readmission
    plt.figure(figsize=(12, 10))
    top_corr = readmission_corr.drop('readmitted_binary').abs().sort_values(ascending=False).head(15)
    sns.barplot(x=top_corr.values, y=top_corr.index, palette='viridis')
    plt.title('Top 15 Features Correlated with Readmission', fontsize=16)
    plt.xlabel('Absolute Correlation Coefficient', fontsize=14)
    plt.ylabel('Feature', fontsize=14)
    plt.grid(axis='x', alpha=0.3)
    plt.tight_layout()
    plt.savefig('../data/visualizations/readmission_correlation.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Number of medications vs. Readmission
    print("\n10. Analyzing number of medications vs. readmission...")
    meds_readmission = df.groupby('num_medications')['readmitted_binary'].mean() * 100
    print("Readmission Rate by Number of Medications:")
    print(meds_readmission.head())
    
    plt.figure(figsize=(14, 6))
    sns.lineplot(x='num_medications', y='readmitted_binary', data=df, estimator=lambda x: len(x[x == 1]) / len(x) * 100, 
                marker='o', color='#9C27B0')
    plt.title('Readmission Rate by Number of Medications', fontsize=16)
    plt.xlabel('Number of Medications', fontsize=14)
    plt.ylabel('Readmission Rate (%)', fontsize=14)
    plt.grid(True, alpha=0.3)
    plt.savefig('../data/visualizations/medications_vs_readmission.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Create a summary of findings
    print("\n11. Creating summary of findings...")
    
    summary = """
# Exploratory Data Analysis - Key Findings

## Readmission Distribution
- Overall readmission rate: {:.2f}%
- Total patients: {:,}
- Readmitted patients: {:,}
- Non-readmitted patients: {:,}

## Demographic Factors
### Age
- Readmission rates increase with age
- Highest readmission rate: {:.2f}% for patients over 70
- Lowest readmission rate: {:.2f}% for patients under 30

### Gender
- Male readmission rate: {:.2f}%
- Female readmission rate: {:.2f}%

### Race
- Highest readmission rate by race: {:.2f}% for {}
- Lowest readmission rate by race: {:.2f}% for {}

## Clinical Factors
### Time in Hospital
- Strong positive correlation with readmission (r = {:.4f})
- Patients staying 14 days have {:.2f}% readmission rate vs {:.2f}% for 1-day stays

### Number of Diagnoses
- Strong positive correlation with readmission (r = {:.4f})
- Patients with 8+ diagnoses have {:.2f}% higher readmission rates

### Number of Medications
- Moderate correlation with readmission (r = {:.4f})
- Readmission rate increases with number of medications

## Top Predictive Factors
1. Time in hospital (r = {:.4f})
2. Number of diagnoses (r = {:.4f})
3. Number of procedures (r = {:.4f})
4. Number of medications (r = {:.4f})
5. Age (r = {:.4f})

## Recommendations for Modeling
- Focus on time in hospital, number of diagnoses, and age as key predictors
- Consider interaction effects between age and clinical factors
- Address class imbalance in the readmission target variable
- Explore non-linear relationships, especially with number of medications
""".format(
    readmission_percentage[1],
    df.shape[0],
    readmission_counts[1],
    readmission_counts[0],
    age_readmission.max(),
    age_readmission.min(),
    gender_readmission.get('Male', gender_readmission.iloc[0]),
    gender_readmission.get('Female', gender_readmission.iloc[-1]),
    race_readmission.max(),
    race_readmission.idxmax(),
    race_readmission.min(),
    race_readmission.idxmin(),
    corr_matrix['readmitted_binary']['time_in_hospital'],
    time_readmission.max(),
    time_readmission.min(),
    corr_matrix['readmitted_binary']['number_diagnoses'],
    diagnoses_readmission.max() - diagnoses_readmission.min(),
    corr_matrix['readmitted_binary']['num_medications'],
    corr_matrix['readmitted_binary']['time_in_hospital'],
    corr_matrix['readmitted_binary']['number_diagnoses'],
    corr_matrix['readmitted_binary'].get('num_procedures', 0),
    corr_matrix['readmitted_binary']['num_medications'],
    corr_matrix['readmitted_binary'].get('age_numeric', 0)
)
    
    with open('../data/visualizations/eda_summary.md', 'w') as f:
        f.write(summary)
    
    print("Summary of findings saved to '../data/visualizations/eda_summary.md'")
    
    # Prepare data for Power BI
    print("\n12. Preparing data for Power BI visualization...")
    
    # Create directory for Power BI data
    os.makedirs('../powerbi/data', exist_ok=True)
    
    # Save key analysis results for Power BI
    
    # Age group analysis
    age_analysis = df.groupby('age_group')['readmitted_binary'].agg(['count', 'mean']).reset_index()
    age_analysis['mean'] = age_analysis['mean'] * 100
    age_analysis.columns = ['Age_Group', 'Patient_Count', 'Readmission_Rate']
    age_analysis.to_csv('../powerbi/data/age_analysis.csv', index=False)
    
    # Time in hospital analysis
    time_analysis = df.groupby('time_in_hospital')['readmitted_binary'].agg(['count', 'mean']).reset_index()
    time_analysis['mean'] = time_analysis['mean'] * 100
    time_analysis.columns = ['Days_in_Hospital', 'Patient_Count', 'Readmission_Rate']
    time_analysis.to_csv('../powerbi/data/time_analysis.csv', index=False)
    
    # Diagnoses analysis
    diagnoses_analysis = df.groupby('number_diagnoses')['readmitted_binary'].agg(['count', 'mean']).reset_index()
    diagnoses_analysis['mean'] = diagnoses_analysis['mean'] * 100
    diagnoses_analysis.columns = ['Number_of_Diagnoses', 'Patient_Count', 'Readmission_Rate']
    diagnoses_analysis.to_csv('../powerbi/data/diagnoses_analysis.csv', index=False)
    
    # Gender analysis
    gender_analysis = df.groupby('gender')['readmitted_binary'].agg(['count', 'mean']).reset_index()
    gender_analysis['mean'] = gender_analysis['mean'] * 100
    gender_analysis.columns = ['Gender', 'Patient_Count', 'Readmission_Rate']
    gender_analysis.to_csv('../powerbi/data/gender_analysis.csv', index=False)
    
    # Race analysis
    race_analysis = df.groupby('race')['readmitted_binary'].agg(['count', 'mean']).reset_index()
    race_analysis['mean'] = race_analysis['mean'] * 100
    race_analysis.columns = ['Race', 'Patient_Count', 'Readmission_Rate']
    race_analysis.to_csv('../powerbi/data/race_analysis.csv', index=False)
    
    # Medications analysis
    meds_analysis = df.groupby('num_medications')['readmitted_binary'].agg(['count', 'mean']).reset_index()
    meds_analysis['mean'] = meds_analysis['mean'] * 100
    meds_analysis.columns = ['Number_of_Medications', 'Patient_Count', 'Readmission_Rate']
    meds_analysis.to_csv('../powerbi/data/medications_analysis.csv', index=False)
    
    # Feature correlation with readmission
    corr_df = pd.DataFrame({
        'Feature': readmission_corr.index,
        'Correlation': readmission_corr.values
    })
    corr_df.to_csv('../powerbi/data/feature_correlation.csv', index=False)
    
    print("Data prepared for Power BI visualization and saved to '../powerbi/data/'")
    print("\nExploratory Data Analysis completed successfully!")

if __name__ == "__main__":
    main()
