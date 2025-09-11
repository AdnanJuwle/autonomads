from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

# Load the model and preprocessor with correct paths
model_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'medical_ai_model.pkl')
preprocessor_path = os.path.join(os.path.dirname(__file__), '..', 'models', 'preprocessor_36.pkl')

model = joblib.load(model_path)
preprocessor = joblib.load(preprocessor_path)

def preprocess_input_data(data):
    """
    Preprocess input data using the saved preprocessor to match the model's expected format
    """
    # Map frontend field names to dataset column names
    column_mapping = {
        'gender': 'Sex',
        'age': 'Age_Category', 
        'height': 'Height_(cm)',
        'weight': 'Weight_(kg)',
        'bmi': 'BMI',
        'exercise': 'Exercise',
        'checkup': 'Checkup',
        'smoking_history': 'Smoking_History',
        'alcohol_consumption': 'Alcohol_Consumption',
        'fruit_consumption': 'Fruit_Consumption',
        'green_vegetables_consumption': 'Green_Vegetables_Consumption',
        'fried_food_consumption': 'FriedPotato_Consumption'
    }
    
    # Rename columns to match dataset
    processed_data = data.rename(columns=column_mapping)
    
    # Add missing General_Health column (required by preprocessor)
    # We'll set a default value since it's not in our frontend form
    processed_data['General_Health'] = 'Good'  # Default value
    
    # Ensure Alcohol_Consumption is numeric (convert Yes/No to 1/0)
    if 'Alcohol_Consumption' in processed_data.columns:
        processed_data['Alcohol_Consumption'] = processed_data['Alcohol_Consumption'].map({'Yes': 1, 'No': 0})
    
    # Use the saved preprocessor to transform the data
    try:
        processed_features = preprocessor.transform(processed_data)
        
        # Ensure we have exactly 36 features
        if processed_features.shape[1] < 36:
            padding_size = 36 - processed_features.shape[1]
            padding = np.zeros((processed_features.shape[0], padding_size))
            processed_features = np.hstack([processed_features, padding])
        
        return processed_features
        
    except Exception as e:
        print(f"Error in preprocessing: {str(e)}")
        # Fallback: create a zero vector with 36 features
        return np.zeros((1, 36))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON data from the POST request
        data = request.get_json()

        # Check if all required fields are present
        required_fields = ['age', 'gender', 'height', 'weight', 'bmi', 'exercise', 'checkup',
                           'smoking_history', 'alcohol_consumption', 'fruit_consumption',
                           'green_vegetables_consumption', 'fried_food_consumption']
        
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        # Convert data into a DataFrame
        input_data = pd.DataFrame([data])

        # Preprocess the input data
        input_data_processed = preprocess_input_data(input_data)

        # Debug: print the processed data shape and content
        print(f"Processed data shape: {input_data_processed.shape}")
        print(f"Processed data values: {input_data_processed}")
        
        # Check for NaN values (numpy array)
        if np.isnan(input_data_processed).any():
            print("Warning: NaN values detected in processed data")
            input_data_processed = np.nan_to_num(input_data_processed)

        # Predict using the trained model
        prediction = model.predict(input_data_processed)

        # Prepare prediction response
        diseases = ['Heart_Disease', 'Skin_Cancer', 'Other_Cancer', 'Depression', 'Diabetes', 'Arthritis']
        result = {}
        
        for i, disease in enumerate(diseases):
            if i < len(prediction[0]):
                # Convert 'Yes'/'No' to 1/0
                prediction_value = prediction[0][i]
                if prediction_value == 'Yes':
                    result[disease] = 1
                else:
                    result[disease] = 0
            else:
                result[disease] = 0
        
        return jsonify(result)

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
