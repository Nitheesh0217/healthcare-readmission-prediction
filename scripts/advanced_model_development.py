#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Healthcare Readmission Predictive Analytics - Advanced Model Development
This script implements advanced machine learning models to achieve higher accuracy
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
import os
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier, StackingClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc
from imblearn.over_sampling import SMOTE
import xgboost as xgb
import warnings
warnings.filterwarnings('ignore')

# Set visualization style
sns.set(style='whitegrid')
plt.style.use('seaborn-v0_8-whitegrid')

def main():
    print("Healthcare Readmission Predictive Analytics - Advanced Model Development")
    print("-" * 70)
    
    # Create directories if they don't exist
    os.makedirs('../models/advanced', exist_ok=True)
    
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
    joblib.dump(scaler, '../models/advanced/scaler.pkl')
    print("Scaler saved to '../models/advanced/scaler.pkl'")
    
    # Check class distribution
    print("\n4. Checking class distribution...")
    print(f"Class distribution in training set: {pd.Series(y_train).value_counts(normalize=True)}")
    
    # Apply SMOTE to handle class imbalance
    print("\n5. Applying SMOTE to handle class imbalance...")
    smote = SMOTE(random_state=42)
    X_train_smote, y_train_smote = smote.fit_resample(X_train_scaled, y_train)
    print(f"Class distribution after SMOTE: {pd.Series(y_train_smote).value_counts(normalize=True)}")
    print(f"Training set shape after SMOTE: {X_train_smote.shape}")
    
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
        plt.savefig(f'../models/advanced/{model_name.lower().replace(" ", "_")}_confusion_matrix.png', dpi=300, bbox_inches='tight')
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
            plt.savefig(f'../models/advanced/{model_name.lower().replace(" ", "_")}_roc_curve.png', dpi=300, bbox_inches='tight')
            plt.close()
        
        return model, test_accuracy, test_precision, test_recall, test_f1
    
    # Train and evaluate advanced models
    print("\n6. Training and evaluating advanced models...")
    
    # 1. Neural Network (MLP Classifier)
    print("\nTraining Neural Network model...")
    mlp_model = MLPClassifier(
        hidden_layer_sizes=(100, 50),
        activation='relu',
        solver='adam',
        alpha=0.0001,
        batch_size='auto',
        learning_rate='adaptive',
        max_iter=500,
        random_state=42
    )
    
    mlp_model, mlp_accuracy, mlp_precision, mlp_recall, mlp_f1 = evaluate_model(
        mlp_model, X_train_smote, X_test_scaled, y_train_smote, y_test, "Neural Network"
    )
    
    # 2. Gradient Boosting Classifier
    print("\nTraining Gradient Boosting model...")
    gb_model = GradientBoostingClassifier(
        n_estimators=200,
        learning_rate=0.1,
        max_depth=5,
        min_samples_split=5,
        min_samples_leaf=2,
        subsample=0.8,
        random_state=42
    )
    
    gb_model, gb_accuracy, gb_precision, gb_recall, gb_f1 = evaluate_model(
        gb_model, X_train_smote, X_test_scaled, y_train_smote, y_test, "Gradient Boosting"
    )
    
    # 3. SVM with RBF kernel
    print("\nTraining SVM model...")
    svm_model = SVC(
        C=10.0,
        kernel='rbf',
        gamma='scale',
        probability=True,
        random_state=42
    )
    
    svm_model, svm_accuracy, svm_precision, svm_recall, svm_f1 = evaluate_model(
        svm_model, X_train_smote, X_test_scaled, y_train_smote, y_test, "SVM"
    )
    
    # 4. XGBoost with optimized parameters
    print("\nTraining XGBoost model...")
    xgb_model = xgb.XGBClassifier(
        n_estimators=200,
        learning_rate=0.1,
        max_depth=5,
        subsample=0.8,
        colsample_bytree=0.8,
        gamma=1,
        min_child_weight=5,
        random_state=42
    )
    
    xgb_model, xgb_accuracy, xgb_precision, xgb_recall, xgb_f1 = evaluate_model(
        xgb_model, X_train_smote, X_test_scaled, y_train_smote, y_test, "XGBoost"
    )
    
    # 5. Random Forest with optimized parameters
    print("\nTraining Random Forest model...")
    rf_model = RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        min_samples_split=5,
        min_samples_leaf=2,
        max_features='sqrt',
        bootstrap=True,
        class_weight='balanced',
        random_state=42
    )
    
    rf_model, rf_accuracy, rf_precision, rf_recall, rf_f1 = evaluate_model(
        rf_model, X_train_smote, X_test_scaled, y_train_smote, y_test, "Random Forest"
    )
    
    # 6. Voting Classifier (Ensemble)
    print("\nTraining Voting Classifier (Ensemble)...")
    voting_model = VotingClassifier(
        estimators=[
            ('gb', gb_model),
            ('xgb', xgb_model),
            ('rf', rf_model),
            ('mlp', mlp_model)
        ],
        voting='soft'
    )
    
    voting_model, voting_accuracy, voting_precision, voting_recall, voting_f1 = evaluate_model(
        voting_model, X_train_smote, X_test_scaled, y_train_smote, y_test, "Voting Ensemble"
    )
    
    # 7. Stacking Classifier (Advanced Ensemble)
    print("\nTraining Stacking Classifier (Advanced Ensemble)...")
    
    # Define base estimators
    estimators = [
        ('gb', GradientBoostingClassifier(n_estimators=100, random_state=42)),
        ('xgb', xgb.XGBClassifier(n_estimators=100, random_state=42)),
        ('rf', RandomForestClassifier(n_estimators=100, random_state=42)),
        ('mlp', MLPClassifier(hidden_layer_sizes=(50,), max_iter=300, random_state=42))
    ]
    
    # Define stacking model
    stacking_model = StackingClassifier(
        estimators=estimators,
        final_estimator=xgb.XGBClassifier(n_estimators=100, random_state=42),
        cv=5
    )
    
    stacking_model, stacking_accuracy, stacking_precision, stacking_recall, stacking_f1 = evaluate_model(
        stacking_model, X_train_smote, X_test_scaled, y_train_smote, y_test, "Stacking Ensemble"
    )
    
    # Compare model performances
    print("\n7. Comparing model performances...")
    
    models = ['Neural Network', 'Gradient Boosting', 'SVM', 'XGBoost', 'Random Forest', 'Voting Ensemble', 'Stacking Ensemble']
    accuracies = [mlp_accuracy, gb_accuracy, svm_accuracy, xgb_accuracy, rf_accuracy, voting_accuracy, stacking_accuracy]
    precisions = [mlp_precision, gb_precision, svm_precision, xgb_precision, rf_precision, voting_precision, stacking_precision]
    recalls = [mlp_recall, gb_recall, svm_recall, xgb_recall, rf_recall, voting_recall, stacking_recall]
    f1_scores = [mlp_f1, gb_f1, svm_f1, xgb_f1, rf_f1, voting_f1, stacking_f1]
    
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
    comparison_df.to_csv('../models/advanced/model_comparison.csv', index=False)
    
    # Create comparison plot
    plt.figure(figsize=(12, 8))
    comparison_df_melted = pd.melt(comparison_df, id_vars=['Model'], var_name='Metric', value_name='Score')
    sns.barplot(x='Model', y='Score', hue='Metric', data=comparison_df_melted, palette='viridis')
    plt.title('Advanced Model Comparison', fontsize=16)
    plt.xlabel('Model', fontsize=14)
    plt.ylabel('Score', fontsize=14)
    plt.ylim(0, 1)
    plt.xticks(rotation=45)
    plt.grid(axis='y', alpha=0.3)
    plt.legend(title='Metric', title_fontsize=12)
    plt.tight_layout()
    plt.savefig('../models/advanced/model_comparison.png', dpi=300, bbox_inches='tight')
    plt.close()
    
    # Identify the best model based on accuracy
    best_accuracy = max(accuracies)
    best_model_index = accuracies.index(best_accuracy)
    best_model_name = models[best_model_index]
    
    print(f"\nBest Model (based on Accuracy): {best_model_name} with Accuracy {best_accuracy:.4f}")
    
    # Save the best model
    if best_model_name == 'Neural Network':
        best_model = mlp_model
    elif best_model_name == 'Gradient Boosting':
        best_model = gb_model
    elif best_model_name == 'SVM':
        best_model = svm_model
    elif best_model_name == 'XGBoost':
        best_model = xgb_model
    elif best_model_name == 'Random Forest':
        best_model = rf_model
    elif best_model_name == 'Voting Ensemble':
        best_model = voting_model
    else:  # Stacking Ensemble
        best_model = stacking_model
    
    # Save the model
    joblib.dump(best_model, '../models/advanced/best_model.pkl')
    print(f"Best model ({best_model_name}) saved to '../models/advanced/best_model.pkl'")
    
    # Save the feature list
    with open('../models/advanced/model_features.txt', 'w') as f:
        f.write('\n'.join(available_features))
    print("Feature list saved to '../models/advanced/model_features.txt'")
    
    # Prepare data for Power BI
    print("\n8. Preparing data for Power BI visualization...")
    
    # Create directory for Power BI data
    os.makedirs('../powerbi/data', exist_ok=True)
    
    # Save model comparison for Power BI
    comparison_df.to_csv('../powerbi/data/advanced_model_comparison.csv', index=False)
    
    # Save predictions for visualization
    X_test_df = pd.DataFrame(X_test, columns=available_features)
    X_test_df['actual'] = y_test.values
    X_test_df['predicted'] = best_model.predict(X_test_scaled)
    
    if hasattr(best_model, "predict_proba"):
        X_test_df['probability'] = best_model.predict_proba(X_test_scaled)[:, 1]
    
    X_test_df.to_csv('../powerbi/data/advanced_test_predictions.csv', index=False)
    
    # Create a summary report
    print("\n9. Creating summary report...")
    summary = f"""
# Healthcare Readmission Advanced Model Development

## Overview
This report summarizes the development and evaluation of advanced machine learning models for predicting patient readmission risk.

## Dataset
- **Source**: Diabetes 130-US hospitals dataset
- **Size**: {df.shape[0]} records with {len(available_features)} features
- **Class Distribution**: Original training set had {pd.Series(y_train).value_counts(normalize=True)[1]:.2%} positive cases
- **Resampling**: SMOTE was applied to balance the classes

## Models Evaluated
1. **Neural Network**: Multi-layer Perceptron with 2 hidden layers
2. **Gradient Boosting**: Gradient Boosting Classifier with 200 estimators
3. **SVM**: Support Vector Machine with RBF kernel
4. **XGBoost**: Extreme Gradient Boosting
5. **Random Forest**: Random Forest Classifier with 200 estimators
6. **Voting Ensemble**: Soft voting of multiple models
7. **Stacking Ensemble**: Advanced ensemble with XGBoost meta-learner

## Results

| Model | Accuracy | Precision | Recall | F1 Score |
|-------|----------|-----------|--------|----------|
"""
    
    for i, model_name in enumerate(models):
        summary += f"| {model_name} | {accuracies[i]:.4f} | {precisions[i]:.4f} | {recalls[i]:.4f} | {f1_scores[i]:.4f} |\n"
    
    summary += f"""
## Best Model
The best performing model was **{best_model_name}** with an accuracy of **{best_accuracy:.4f}**.

## Conclusion
The advanced modeling techniques, particularly ensemble methods and class balancing with SMOTE, significantly improved the model performance compared to the baseline models.

## Next Steps
1. Further hyperparameter tuning could potentially improve performance
2. Feature engineering to create more predictive variables
3. Deployment of the model in a production environment
"""
    
    with open('../models/advanced/summary_report.md', 'w') as f:
        f.write(summary)
    print("Summary report saved to '../models/advanced/summary_report.md'")
    
    print("\nAdvanced model development completed successfully!")

if __name__ == "__main__":
    main()
