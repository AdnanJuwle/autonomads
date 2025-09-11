// BMI Calculator functionality
document.getElementById('calculate-bmi').addEventListener('click', function() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (height && weight && height > 0 && weight > 0) {
        const bmi = weight / Math.pow(height / 100, 2);
        document.getElementById('bmi').value = bmi.toFixed(1);
        
        // Show BMI category
        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal weight';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';
        
        // Show result
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<div class="bmi-result">📊 BMI: ${bmi.toFixed(1)} (${category})</div>`;
    } else {
        alert('Please enter valid height and weight values first.');
    }
});

document.getElementById('prediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading state
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<div class="loading">Processing your data...</div>';

    let formData = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        height: parseFloat(document.getElementById('height').value),
        weight: parseFloat(document.getElementById('weight').value),
        bmi: parseFloat(document.getElementById('bmi').value),
        exercise: document.getElementById('exercise').value,
        checkup: document.getElementById('checkup').value,
        smoking_history: document.getElementById('smoking_history').value,
        alcohol_consumption: document.getElementById('alcohol_consumption').value,
        fruit_consumption: parseFloat(document.getElementById('fruit_consumption').value),
        green_vegetables_consumption: parseFloat(document.getElementById('green_vegetables_consumption').value),
        fried_food_consumption: parseFloat(document.getElementById('fried_food_consumption').value)
    };

    console.log('Sending data:', formData);

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Received response:', data);
        
        if (data.error) {
            resultDiv.innerHTML = `<div class="error">Error: ${data.error}</div>`;
            return;
        }

        let resultHTML = '<div class="results-container"><h3>Health Risk Assessment Results</h3><div class="diseases-grid">';
        
        const diseaseNames = {
            'Heart_Disease': 'Heart Disease',
            'Skin_Cancer': 'Skin Cancer',
            'Other_Cancer': 'Other Cancer',
            'Depression': 'Depression',
            'Diabetes': 'Diabetes',
            'Arthritis': 'Arthritis'
        };

        for (let disease in data) {
            const riskLevel = data[disease] ? 'High Risk' : 'Low Risk';
            const riskClass = data[disease] ? 'high-risk' : 'low-risk';
            const diseaseName = diseaseNames[disease] || disease;
            
            resultHTML += `
                <div class="disease-item ${riskClass}">
                    <span class="disease-name">${diseaseName}</span>
                    <span class="risk-level">${riskLevel}</span>
                </div>
            `;
        }
        
        resultHTML += '</div><p class="disclaimer">Note: This is a predictive model for educational purposes. Please consult with healthcare professionals for medical advice.</p></div>';
        
        resultDiv.innerHTML = resultHTML;
    })
    .catch(error => {
        console.error("Error:", error);
        resultDiv.innerHTML = `<div class="error">Error: ${error.message}. Please make sure the backend server is running on http://127.0.0.1:5000</div>`;
    });
});
