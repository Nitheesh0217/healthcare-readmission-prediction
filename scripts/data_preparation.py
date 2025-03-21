#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Healthcare Readmission Predictive Analytics - Data Preparation
This script processes the diabetes dataset for readmission prediction
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

# Set visualization style
sns.set(style='whitegrid')
plt.style.use('seaborn-v0_8-whitegrid')

def main():
    print("Healthcare Readmission Predictive Analytics - Data Preparation")
    print("-" * 60)
    
    # Create directories if they don't exist
    os.makedirs('../data/processed', exist_ok=True)
    
    # Load the dataset
    print("\n1. Loading the dataset...")
    try:
        diabetic_data = pd.read_csv('../data/diabetic_data.csv')
        print(f"Diabetic Data Shape: {diabetic_data.shape}")
        
        # Load IDS mapping if available
        try:
            ids_mapping = pd.read_csv('../data/IDS_mapping.csv')
            print(f"IDs Mapping Shape: {ids_mapping.shape}")
            has_mapping = True
        except FileNotFoundError:
            print("IDS_mapping.csv not found. Proceeding without mapping.")
            has_mapping = False
    except FileNotFoundError:
        print("Error: diabetic_data.csv not found. Please ensure the file is in the data directory.")
        return
    
    # Explore the dataset
    print("\n2. Exploring the dataset...")
    print(f"Columns: {diabetic_data.columns.tolist()}")
    print(f"\nSample data:")
    print(diabetic_data.head())
    
    # Check for missing values
    print("\n3. Checking for missing values...")
    missing_values = diabetic_data.isnull().sum()
    print(f"Columns with missing values: {missing_values[missing_values > 0].shape[0]}")
    
    # Check for '?' values which represent missing data in this dataset
    print("\n4. Checking for '?' values (missing data)...")
    for column in diabetic_data.columns:
        if diabetic_data[column].dtype == object:
            question_marks = (diabetic_data[column] == '?').sum()
            if question_marks > 0:
                print(f"{column}: {question_marks} ('?' values)")
    
    # Data preprocessing
    print("\n5. Preprocessing and cleaning the data...")
    
    # Make a copy of the dataframe to avoid modifying the original
    df = diabetic_data.copy()
    
    # Handle missing values (represented as '?')
    for column in df.columns:
        if df[column].dtype == object:
            # Replace '?' with NaN
            df[column] = df[column].replace('?', np.nan)
    
    # Convert age ranges to numeric values
    # Age is in format '[0-10)', '[10-20)', etc.
    def age_to_numeric(age_range):
        if pd.isna(age_range):
            return np.nan
        # Extract the lower and upper bounds
        lower = int(age_range.strip('[]()').split('-')[0])
        upper = int(age_range.strip('[]()').split('-')[1])
        # Return the midpoint
        return (lower + upper) / 2
    
    df['age_numeric'] = df['age'].apply(age_to_numeric)
    
    # Convert 'max_glu_serum' and 'A1Cresult' to numeric
    # These are categorical but can be converted to ordinal
    glucose_mapping = {'None': 0, 'Norm': 1, '>200': 2, '>300': 3}
    a1c_mapping = {'None': 0, 'Norm': 1, '>7': 2, '>8': 3}
    
    df['max_glu_serum_numeric'] = df['max_glu_serum'].map(glucose_mapping)
    df['A1Cresult_numeric'] = df['A1Cresult'].map(a1c_mapping)
    
    # Convert readmitted to binary (0 = No, 1 = Yes)
    df['readmitted_binary'] = df['readmitted'].apply(lambda x: 0 if x == 'NO' else 1)
    
    # Encode categorical variables
    categorical_columns = ['gender', 'race', 'admission_type_id', 
                          'discharge_disposition_id', 'admission_source_id']
    
    for column in categorical_columns:
        le = LabelEncoder()
        # Handle NaN values
        non_null_mask = df[column].notna()
        df.loc[non_null_mask, f'{column}_encoded'] = le.fit_transform(df.loc[non_null_mask, column])
        # Fill NaN values with -1
        df[f'{column}_encoded'] = df[f'{column}_encoded'].fillna(-1).astype(int)
    
    # If we have the mapping file, merge it to get descriptions
    if has_mapping:
        # Merge with admission_type_id
        if 'admission_type_id' in ids_mapping.columns:
            admission_type_mapping = ids_mapping[ids_mapping['admission_type_id'].notna()]
            # Convert admission_type_id to string in both dataframes to avoid type mismatch
            df['admission_type_id_str'] = df['admission_type_id'].astype(str)
            admission_type_mapping['admission_type_id_str'] = admission_type_mapping['admission_type_id'].astype(str)
            df = pd.merge(df, 
                         admission_type_mapping[['admission_type_id_str', 'description']], 
                         on='admission_type_id_str', 
                         how='left')
    
    # Handle remaining missing values
    # For numeric columns, fill with median
    numeric_columns = df.select_dtypes(include=['float64', 'int64']).columns
    for column in numeric_columns:
        df[column] = df[column].fillna(df[column].median())
    
    # For categorical columns, fill with mode
    categorical_columns = df.select_dtypes(include=['object']).columns
    for column in categorical_columns:
        df[column] = df[column].fillna(df[column].mode()[0])
    
    # Split the data into training and testing sets
    print("\n6. Splitting data into training and testing sets...")
    features = [col for col in df.columns if col not in ['readmitted', 'readmitted_binary', 
                                                        'encounter_id', 'patient_nbr']]
    X = df[features]
    y = df['readmitted_binary']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Training set shape: {X_train.shape}")
    print(f"Testing set shape: {X_test.shape}")
    
    # Save the processed data
    print("\n7. Saving processed data...")
    df.to_csv('../data/processed/diabetic_data_cleaned.csv', index=False)
    print("Cleaned dataset saved to '../data/processed/diabetic_data_cleaned.csv'")
    
    # Save train and test sets
    train_df = pd.concat([X_train, y_train], axis=1)
    test_df = pd.concat([X_test, y_test], axis=1)
    
    train_df.to_csv('../data/processed/train_data.csv', index=False)
    test_df.to_csv('../data/processed/test_data.csv', index=False)
    print("Train and test datasets saved to '../data/processed/'")
    
    # Generate basic statistics
    print("\n8. Generating basic statistics...")
    stats = df.describe()
    stats.to_csv('../data/processed/data_statistics.csv')
    print("Basic statistics saved to '../data/processed/data_statistics.csv'")
    
    # Create a data dictionary
    print("\n9. Creating data dictionary...")
    data_dict = pd.DataFrame({
        'Column': df.columns,
        'Type': df.dtypes,
        'Missing_Values': df.isna().sum(),
        'Unique_Values': [df[col].nunique() for col in df.columns]
    })
    data_dict.to_csv('../data/processed/data_dictionary.csv', index=False)
    print("Data dictionary saved to '../data/processed/data_dictionary.csv'")
    
    print("\nData preparation completed successfully!")

if __name__ == "__main__":
    main()
