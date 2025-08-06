from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)

# Load trained model and model columns
model_path = os.path.dirname(__file__)
model = joblib.load(os.path.join(model_path, 'flight_delay_model.pkl'))
model_columns = joblib.load(os.path.join(model_path, 'model_columns.pkl'))

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_df = pd.DataFrame([data])

        # One-hot encode input
        input_encoded = pd.get_dummies(input_df)

        # Align with model columns
        input_encoded = input_encoded.reindex(columns=model_columns, fill_value=0)

        # Convert prediction to native Python float
        prediction = float(model.predict_proba(input_encoded)[0][1])

        return jsonify({
            'delay_probability': round(prediction, 4),
            'delay_percent': f"{prediction * 100:.2f}%"
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
