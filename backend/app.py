from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

# Load the model (ensure the correct path to the model file)
model = joblib.load('C:/Users/ADNAN/Documents/AI-Medical-Diagnosis-System/models/medical_ai_model.pkl')

# Preprocessing steps similar to the ones used during model training
cat_columns = ['gender', 'smoking_history', 'alcohol_consumption']
num_columns = ['age', 'height', 'weight', 'bmi', 'exercise', 'checkup', 'fruit_consumption', 'green_vegetables_consumption', 'fried_food_consumption']

# Define preprocessing functions
encoder = LabelEncoder()

def preprocess_input_data(data):
    # Encode categorical features using OneHotEncoder with 'sparse_output' parameter
    onehot_encoder = OneHotEncoder(handle_unknown='ignore', sparse_output=False)
    
    # One-hot encode the categorical columns
    encoded_data = onehot_encoder.fit_transform(data[cat_columns])
    
    # Convert the encoded data back into a DataFrame
    encoded_df = pd.DataFrame(encoded_data, columns=onehot_encoder.get_feature_names_out(cat_columns))
    
    # Concatenate the encoded categorical data with numerical data
    data = pd.concat([data[num_columns], encoded_df], axis=1)
    
    # Scale numerical features
    scaler = StandardScaler()
    data[num_columns] = scaler.fit_transform(data[num_columns])
    
    return data

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

        # Preprocess the input data (apply same steps as model training)
        input_data_processed = preprocess_input_data(input_data)

        # Predict using the trained model
        prediction = model.predict(input_data_processed)

        # Prepare prediction response
        result = {f'{disease}': int(prediction[0][i]) for i, disease in enumerate(['Heart_Disease', 'Skin_Cancer', 'Other_Cancer', 'Depression', 'Diabetes', 'Arthritis'])}
        
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
