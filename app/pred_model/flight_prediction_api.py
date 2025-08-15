from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load model and feature columns
model = joblib.load('flight_delay_model.pkl')
model_columns = joblib.load('model_columns.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Convert to DataFrame
        input_df = pd.DataFrame([data])

        # Ensure all model columns are present
        # Missing columns → fill with 0
        input_df = input_df.reindex(columns=model_columns, fill_value=0)

        # Make prediction (probability of delay)
        proba = model.predict_proba(input_df)[0][1]

        # Apply optimal threshold from training
        optimal_threshold = 0.80
        prediction = int(proba >= optimal_threshold)

        return jsonify({
            'delay_probability': round(float(proba), 4),
            'prediction': prediction  # 1 = delay, 0 = no delay
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Flight Delay Prediction API is running.'})

if __name__ == '__main__':
    app.run(debug=True)
