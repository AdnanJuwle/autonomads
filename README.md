# AI Medical Diagnosis System

A machine learning-based medical diagnosis system that predicts the risk of various diseases based on patient health data.

## Features

- **Multi-disease Prediction**: Predicts risk for 6 different diseases:
  - Heart Disease
  - Skin Cancer
  - Other Cancer
  - Depression
  - Diabetes
  - Arthritis

- **Modern Web Interface**: Clean, responsive frontend with real-time predictions
- **RESTful API**: Flask-based backend with proper error handling
- **Machine Learning Model**: Trained on cardiovascular disease dataset

## Quick Start

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AI-Medical-Diagnosis-System
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

### Running the Application

1. **Start the Backend Server**:
```bash
cd backend
python app.py
```
The API will be available at `http://127.0.0.1:5000`

2. **Start the Frontend Server** (in a new terminal):
```bash
cd frontend
python -m http.server 8080
```
The web interface will be available at `http://127.0.0.1:8080`

3. **Open your browser** and navigate to `http://127.0.0.1:8080`

## Usage

1. Fill out the health assessment form with your information:
   - Age category
   - Gender
   - Height and weight
   - BMI
   - Exercise habits
   - Check-up frequency
   - Smoking history
   - Alcohol consumption
   - Dietary habits (fruit, vegetables, fried food)

2. Click "Predict" to get your health risk assessment

3. Review the results showing risk levels for each disease

## API Endpoints

### POST /predict

Predicts disease risk based on health data.

**Request Body:**
```json
{
  "age": "25-29",
  "gender": "Male",
  "height": 175,
  "weight": 70,
  "bmi": 22.9,
  "exercise": "Yes",
  "checkup": "Within the past year",
  "smoking_history": "No",
  "alcohol_consumption": "No",
  "fruit_consumption": 2,
  "green_vegetables_consumption": 3,
  "fried_food_consumption": 1
}
```

**Response:**
```json
{
  "Heart_Disease": 0,
  "Skin_Cancer": 0,
  "Other_Cancer": 0,
  "Depression": 0,
  "Diabetes": 0,
  "Arthritis": 0
}
```

Where `1` indicates high risk and `0` indicates low risk.

## Project Structure

```
AI-Medical-Diagnosis-System/
├── backend/
│   ├── app.py              # Flask API server
│   └── medical_ai_model.pkl # Trained ML model
├── frontend/
│   ├── index.html          # Main web interface
│   ├── script.js           # Frontend JavaScript
│   └── styles.css          # Styling
├── models/
│   └── medical_ai_model.pkl # ML model (duplicate)
├── datasets/
│   └── CVD_cleaned.csv     # Training dataset
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## Technical Details

- **Model**: MultiOutputClassifier with LogisticRegression
- **Features**: 36 input features including demographic, lifestyle, and health data
- **Preprocessing**: Handles categorical variables and missing values
- **Frontend**: Vanilla JavaScript with modern CSS Grid layout
- **Backend**: Flask with CORS support for cross-origin requests

## Important Notes

⚠️ **Medical Disclaimer**: This system is for educational and research purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

## Troubleshooting

### Common Issues

1. **"Connection refused" error**: Make sure both servers are running
2. **"Model not found" error**: Ensure the model file exists in the models directory
3. **CORS errors**: The backend includes CORS headers, but make sure both servers are running

### Port Conflicts

If ports 5000 or 8080 are in use, you can change them:
- Backend: Modify the `app.run()` call in `backend/app.py`
- Frontend: Use a different port with `python -m http.server <port>`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Please ensure compliance with local regulations regarding medical software.
