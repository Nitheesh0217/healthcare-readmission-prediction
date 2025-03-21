#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Healthcare Readmission Predictive Analytics - Model Development
This script develops machine learning models for predicting patient readmission
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
import joblib
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc
import xgboost as xgb
import warnings
warnings.filterwarnings('ignore')

# Set visualization style
sns.set(style='whitegrid')
plt.style.use('seaborn-v0_8-whitegrid')

def main():
    print("Healthcare Readmission Predictive Analytics - Model Development")
    print("-" * 60)
    
    # Create directories if they don't exist
    os.makedirs('../models', exist_ok=True)
    
    # Load the processed dataset
    print("\n1. Loading the cleaned dataset...")
    try:
        df = pd.read_csv('../data/processed/diabetic_data_cleaned.csv')
        print(f"Dataset shape: {df.shape}")
    except FileNotFoundError:
        print("Error: Processed dataset not found. Please run data_preparation.py first.")
        return
    
    # Prepare features and target variable
    print("\n2. Preparing features and target variable...")
    
    # Based on EDA, select the most important features
    features = [
        'age_numeric', 'time_in_hospital', 'num_lab_procedures', 'num_procedures',
        'num_medications', 'number_outpatient', 'number_emergency', 'number_inpatient',
        'number_diagnoses', 'max_glu_serum_numeric', 'A1Cresult_numeric',
        'gender_encoded', 'race_encoded', 'admission_type_id_encoded',
        'discharge_disposition_id_encoded', 'admission_source_id_encoded'
    ]
    
    # Check which features are actually available in the dataset
    available_features = [feature for feature in features if feature in df.columns]
    print(f"Using {len(available_features)} features for modeling:")
    for feature in available_features:
        print(f"  - {feature}")
    
    # Define X (features) and y (target)
    X = df[available_features]
    y = df['readmitted_binary']
    
    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"Training set shape: {X_train.shape}")
    print(f"Testing set shape: {X_test.shape}")
    
    # Scale the features
    print("\n3. Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Save the scaler for future use
    joblib.dump(scaler, '../models/scaler.pkl')
    print("Scaler saved to '../models/scaler.pkl'")
    
    # Train and evaluate models
    print("\n4. Training and evaluating models...")
    
    # Function to evaluate model performance
    def evaluate_model(model, X_train, X_test, y_train, y_test, model_name):
        print(f"\n{model_name} Training:")
        
        # Train the model
        model.fit(X_train, y_train)
        
        # Make predictions
        y_train_pred = model.predict(X_train)
        y_test_pred = model.predict(X_test)
        
        # Calculate metrics
        train_accuracy = accuracy_score(y_train, y_train_pred)
        test_accuracy = accuracy_score(y_test, y_test_pred)
        test_precision = precision_score(y_test, y_test_pred)
        test_recall = recall_score(y_test, y_test_pred)
        test_f1 = f1_score(y_test, y_test_pred)
        
        # Print results
        print(f"Training Accuracy: {train_accuracy:.4f}")
        print(f"Testing Accuracy: {test_accuracy:.4f}")
        print(f"Testing Precision: {test_precision:.4f}")
        print(f"Testing Recall: {test_recall:.4f}")
        print(f"Testing F1 Score: {test_f1:.4f}")
        
        # Print classification report
        print(f"Classification Report (Test Set):")
        print(classification_report(y_test, y_test_pred))
        
        # Create confusion matrix
        cm = confusion_matrix(y_test, y_test_pred)
        plt.figure(figsize=(8, 6))
        sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=False)
        plt.title(f'Confusion Matrix - {model_name}', fontsize=16)
        plt.xlabel('Predicted Label', fontsize=14)
        plt.ylabel('True Label', fontsize=14)
        plt.xticks([0.5, 1.5], ['Not Readmitted', 'Readmitted'])
        plt.yticks([0.5, 1.5], ['Not Readmitted', 'Readmitted'])
        plt.tight_layout()
        plt.savefig(f'../models/{model_name.lower().replace(" ", "_")}_confusion_matrix.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        # Create ROC curve
        if hasattr(model, "predict_proba"):
            y_pred_prob = model.predict_proba(X_test)[:, 1]
            fpr, tpr, _ = roc_curve(y_test, y_pred_prob)
            roc_auc = auc(fpr, tpr)
            
            plt.figure(figsize=(8, 6))
            plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (area = {roc_auc:.2f})')
            plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--')
            plt.xlim([0.0, 1.0])
            plt.ylim([0.0, 1.05])
            plt.xlabel('False Positive Rate', fontsize=14)
            plt.ylabel('True Positive Rate', fontsize=14)
            plt.title(f'ROC Curve - {model_name}', fontsize=16)
            plt.legend(loc="lower right")
            plt.grid(True, alpha=0.3)
            plt.savefig(f'../models/{model_name.lower().replace(" ", "_")}_roc_curve.png', dpi=300, bbox_inches='tight')
            plt.close()
        
        return model, test_accuracy, test_precision, test_recall, test_f1
    
    # 1. Logistic Regression with hyperparameter tuning
    print("\nTraining Logistic Regression model...")
    
    # Define hyperparameter grid
    param_grid_lr = {
        'C': [0.01, 0.1, 1, 10],
        'solver': ['liblinear', 'saga'],
        'max_iter': [100, 1000]
    }
    
    # Create grid search
    lr_model = LogisticRegression(random_state=42)
    grid_search_lr = GridSearchCV(lr_model, param_grid_lr, cv=5, scoring='f1', n_jobs=-1)
    grid_search_lr.fit(X_train_scaled, y_train)
    
    # Get best parameters
    best_lr = grid_search_lr.best_estimator_
    print(f"Best Logistic Regression parameters: {grid_search_lr.best_params_}")
    
    # Evaluate the model
    lr_model, lr_accuracy, lr_precision, lr_recall, lr_f1 = evaluate_model(
        best_lr, X_train_scaled, X_test_scaled, y_train, y_test, "Logistic Regression"
    )
    
    # 2. Random Forest Classifier with hyperparameter tuning
    print("\nTraining Random Forest Classifier model...")
    
    # Define hyperparameter grid
    param_grid_rf = {
        'n_estimators': [100, 200],
        'max_depth': [None, 10, 20],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    }
    
    # Create grid search
    rf_model = RandomForestClassifier(random_state=42)
    grid_search_rf = GridSearchCV(rf_model, param_grid_rf, cv=5, scoring='f1', n_jobs=-1)
    grid_search_rf.fit(X_train_scaled, y_train)
    
    # Get best parameters
    best_rf = grid_search_rf.best_estimator_
    print(f"Best Random Forest parameters: {grid_search_rf.best_params_}")
    
    # Evaluate the model
    rf_model, rf_accuracy, rf_precision, rf_recall, rf_f1 = evaluate_model(
        best_rf, X_train_scaled, X_test_scaled, y_train, y_test, "Random Forest"
    )
    
    # 3. XGBoost Classifier with hyperparameter tuning
    print("\nTraining XGBoost Classifier model...")
    
    # Define hyperparameter grid
    param_grid_xgb = {
        'n_estimators': [100, 200],
        'learning_rate': [0.01, 0.1],
        'max_depth': [3, 5, 7],
        'subsample': [0.8, 1.0],
        'colsample_bytree': [0.8, 1.0]
    }
    
    # Create grid search
    xgb_model = xgb.XGBClassifier(random_state=42)
    grid_search_xgb = GridSearchCV(xgb_model, param_grid_xgb, cv=5, scoring='f1', n_jobs=-1)
    grid_search_xgb.fit(X_train_scaled, y_train)
    
    # Get best parameters
    best_xgb = grid_search_xgb.best_estimator_
    print(f"Best XGBoost parameters: {grid_search_xgb.best_params_}")
    
    # Evaluate the model
    xgb_model, xgb_accuracy, xgb_precision, xgb_recall, xgb_f1 = evaluate_model(
        best_xgb, X_train_scaled, X_test_scaled, y_train, y_test, "XGBoost"
    )
    
    # Compare model performances
    print("\n5. Comparing model performances...")
    
    models = ['Logistic Regression', 'Random Forest', 'XGBoost']
    accuracies = [lr_accuracy, rf_accuracy, xgb_accuracy]
    precisions = [lr_precision, rf_precision, xgb_precision]
    recalls = [lr_recall, rf_recall, xgb_recall]
    f1_scores = [lr_f1, rf_f1, xgb_f1]
    
    # Create comparison DataFrame
    comparison_df = pd.DataFrame({
        'Model': models,
        'Accuracy': accuracies,
        'Precision': precisions,
        'Recall': recalls,
        'F1 Score': f1_scores
    })
    
    print("\nModel Comparison:")
    print(comparison_df)
    
    # Save comparison to CSV
    comparison_df.to_csv('../models/model_comparison.csv', index=False)
    
    # Create comparison plot
    plt.figure(figsize=(12, 8))
    comparison_df_melted = pd.melt(comparison_df, id_vars=['Model'], var_name='Metric', value_name='Score')
    sns.barplot(x='Model', y='Score', hue='Metric', data=comparison_df_melted, palette='viridis')
    plt.title('Model Comparison', fontsize=16)
    plt.xlabel('Model', fontsize=14)
    plt.ylabel('Score', fontsize=14)
    plt.ylim(0, 1)
    plt.grid(axis='y', alpha=0.3)
    plt.legend(title='Metric', title_fontsize=12)
    plt.tight_layout()
    plt.savefig('../models/model_comparison.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Identify the best model based on F1 score
    best_f1 = max(f1_scores)
    best_model_index = f1_scores.index(best_f1)
    best_model_name = models[best_model_index]
    
    print(f"\nBest Model (based on F1 Score): {best_model_name} with F1 Score {best_f1:.4f}")
    
    # Save the best model
    if best_model_name == 'Logistic Regression':
        best_model = lr_model
    elif best_model_name == 'Random Forest':
        best_model = rf_model
    else:  # XGBoost
        best_model = xgb_model
    
    # Save the model
    joblib.dump(best_model, '../models/readmission_model.pkl')
    print(f"Best model ({best_model_name}) saved to '../models/readmission_model.pkl'")
    
    # Save the feature list
    with open('../models/model_features.txt', 'w') as f:
        f.write('\n'.join(available_features))
    print("Feature list saved to '../models/model_features.txt'")
    
    # Feature importance analysis
    print("\n6. Analyzing feature importance...")
    
    if best_model_name == 'Logistic Regression':
        # For logistic regression, use coefficients as importance
        importance = np.abs(best_model.coef_[0])
        feature_importance = pd.DataFrame({
            'Feature': available_features,
            'Importance': importance
        })
    elif best_model_name in ['Random Forest', 'XGBoost']:
        # For tree-based models, use feature_importances_
        importance = best_model.feature_importances_
        feature_importance = pd.DataFrame({
            'Feature': available_features,
            'Importance': importance
        })
    
    # Sort by importance
    feature_importance = feature_importance.sort_values('Importance', ascending=False).reset_index(drop=True)
    
    print("\nFeature Importance:")
    print(feature_importance.head(10))
    
    # Save feature importance to CSV
    feature_importance.to_csv('../models/feature_importance.csv', index=False)
    
    # Plot feature importance
    plt.figure(figsize=(12, 8))
    sns.barplot(x='Importance', y='Feature', data=feature_importance.head(10), palette='viridis')
    plt.title(f'Top 10 Feature Importance - {best_model_name}', fontsize=16)
    plt.xlabel('Importance', fontsize=14)
    plt.ylabel('Feature', fontsize=14)
    plt.grid(axis='x', alpha=0.3)
    plt.tight_layout()
    plt.savefig('../models/feature_importance.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Prepare data for Power BI
    print("\n7. Preparing data for Power BI visualization...")
    
    # Create directory for Power BI data
    os.makedirs('../powerbi/data', exist_ok=True)
    
    # Save model comparison for Power BI
    comparison_df.to_csv('../powerbi/data/model_comparison.csv', index=False)
    
    # Save feature importance for Power BI
    feature_importance.to_csv('../powerbi/data/feature_importance.csv', index=False)
    
    # Save predictions for visualization
    X_test_df = pd.DataFrame(X_test, columns=available_features)
    X_test_df['actual'] = y_test.values
    X_test_df['predicted'] = best_model.predict(X_test_scaled)
    
    if hasattr(best_model, "predict_proba"):
        X_test_df['probability'] = best_model.predict_proba(X_test_scaled)[:, 1]
    
    X_test_df.to_csv('../powerbi/data/test_predictions.csv', index=False)
    
    print("Model development completed successfully!")

if __name__ == "__main__":
    main()
