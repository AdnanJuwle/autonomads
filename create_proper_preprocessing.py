import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer

# Load the dataset to understand the original preprocessing
df = pd.read_csv('datasets/CVD_cleaned.csv')

# Define the features that should be used for training
# Based on the dataset, we need to exclude the target variables
target_columns = ['Heart_Disease', 'Skin_Cancer', 'Other_Cancer', 'Depression', 'Diabetes', 'Arthritis']
feature_columns = [col for col in df.columns if col not in target_columns]

print("Feature columns:", feature_columns)

# Separate categorical and numerical features
categorical_features = ['General_Health', 'Checkup', 'Exercise', 'Sex', 'Age_Category', 'Smoking_History']
numerical_features = ['Height_(cm)', 'Weight_(kg)', 'BMI', 'Alcohol_Consumption', 
                     'Fruit_Consumption', 'Green_Vegetables_Consumption', 'FriedPotato_Consumption']

print("Categorical features:", categorical_features)
print("Numerical features:", numerical_features)

# Create a sample of the data for preprocessing
sample_data = df[feature_columns].head(1000)

# Create the preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_features),
        ('cat', OneHotEncoder(drop='first', sparse_output=False), categorical_features)
    ]
)

# Fit the preprocessor
processed_data = preprocessor.fit_transform(sample_data)

print(f"Processed data shape: {processed_data.shape}")
print(f"Number of features: {processed_data.shape[1]}")

# Get feature names
feature_names = []
feature_names.extend(numerical_features)
feature_names.extend(preprocessor.named_transformers_['cat'].get_feature_names_out(categorical_features))

print(f"Feature names ({len(feature_names)}):")
for i, name in enumerate(feature_names):
    print(f"{i}: {name}")

# Save the preprocessor for use in the Flask app
import joblib
joblib.dump(preprocessor, 'models/preprocessor.pkl')
print("\nPreprocessor saved to models/preprocessor.pkl")



