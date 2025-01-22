document.getElementById('prediction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        bmi: document.getElementById('bmi').value,
        exercise: document.getElementById('exercise').value,
        checkup: document.getElementById('checkup').value,
        smoking_history: document.getElementById('smoking_history').value,
        alcohol_consumption: document.getElementById('alcohol_consumption').value,
        fruit_consumption: document.getElementById('fruit_consumption').value,
        green_vegetables_consumption: document.getElementById('green_vegetables_consumption').value,
        fried_food_consumption: document.getElementById('fried_food_consumption').value
    };

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        let resultText = "Predictions: \n";
        for (let disease in data) {
            resultText += `${disease}: ${data[disease] ? 'Yes' : 'No'}\n`;
        }
        document.getElementById('result').innerText = resultText;
    })
    .catch(error => console.error("Error:", error));
});
