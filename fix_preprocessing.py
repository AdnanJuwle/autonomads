import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer

# Load the dataset to understand all possible values
df = pd.read_csv('datasets/CVD_cleaned.csv')

# Define features
target_columns = ['Heart_Disease', 'Skin_Cancer', 'Other_Cancer', 'Depression', 'Diabetes', 'Arthritis']
feature_columns = [col for col in df.columns if col not in target_columns]

# Separate categorical and numerical features
categorical_features = ['General_Health', 'Checkup', 'Exercise', 'Sex', 'Age_Category', 'Smoking_History']
numerical_features = ['Height_(cm)', 'Weight_(kg)', 'BMI', 'Alcohol_Consumption', 
                     'Fruit_Consumption', 'Green_Vegetables_Consumption', 'FriedPotato_Consumption']

# Create a comprehensive preprocessing pipeline that creates exactly 36 features
# We need to ensure we get 36 features total

# For categorical features, we'll use OneHotEncoder without dropping any categories
# This will create more features but we can pad to 36

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_features),
        ('cat', OneHotEncoder(drop=None, sparse_output=False), categorical_features)  # Don't drop any categories
    ]
)

# Fit on all data to get all possible categories
processed_data = preprocessor.fit_transform(df[feature_columns])

print(f"Processed data shape: {processed_data.shape}")
print(f"Number of features: {processed_data.shape[1]}")

# If we have fewer than 36 features, we need to pad
if processed_data.shape[1] < 36:
    # Create padding to reach 36 features
    padding_size = 36 - processed_data.shape[1]
    padding = np.zeros((processed_data.shape[0], padding_size))
    processed_data = np.hstack([processed_data, padding])
    print(f"Padded to {processed_data.shape[1]} features")

# Get feature names
feature_names = []
feature_names.extend(numerical_features)
feature_names.extend(preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_features))

# Add padding feature names
for i in range(len(feature_names), 36):
    feature_names.append(f'padding_feature_{i}')

print(f"Total feature names: {len(feature_names)}")

# Save the preprocessor
import joblib
joblib.dump(preprocessor, 'models/preprocessor_36.pkl')
print("Preprocessor saved to models/preprocessor_36.pkl")

# Test with a sample
sample_input = {
    'General_Health': 'Good',
    'Checkup': 'Within the past year',
    'Exercise': 'Yes',
    'Sex': 'Male',
    'Age_Category': '25-29',
    'Smoking_History': 'No',
    'Height_(cm)': 175,
    'Weight_(kg)': 70,
    'BMI': 22.9,
    'Alcohol_Consumption': 0,
    'Fruit_Consumption': 2,
    'Green_Vegetables_Consumption': 3,
    'FriedPotato_Consumption': 1
}

# Convert to DataFrame
sample_df = pd.DataFrame([sample_input])
processed_sample = preprocessor.transform(sample_df)

# Pad if necessary
if processed_sample.shape[1] < 36:
    padding_size = 36 - processed_sample.shape[1]
    padding = np.zeros((processed_sample.shape[0], padding_size))
    processed_sample = np.hstack([processed_sample, padding])

print(f"Sample processed shape: {processed_sample.shape}")
print(f"Sample processed data: {processed_sample[0][:10]}...")  # Show first 10 features



