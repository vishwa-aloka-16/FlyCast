# FlyCast - Flight Delay Prediction Web Application

FlyCast is a web-based application that predicts the probability of a flight being delayed based on airline, origin, destination, departure time, and date. It uses a machine learning model trained on historical US domestic flight data and provides users with real-time predictions and alternative flight suggestions.

***

## Features

* Predicts flight delay probability based on user input
* Uses a trained machine learning model (`XGBClassifier`)
* Flask backend handles API requests and model inference
* Frontend built with HTML, CSS, and JavaScript
* Dynamic form processing and display using JavaScript
* Delay probability displayed with color-coded feedback
* Suggests alternative flights with lower delay chances
* Cross-Origin support enabled using Flask-CORS

***

## User Interface

The user interface is built using simple HTML, CSS (via Bootstrap or custom), and JavaScript. It consists of:

* A form to enter flight details:
  * Airline
  * Departure Airport
  * Arrival Airport
  * Departure Time
  * Departure Date
* A "Check Flight Delay" button to send data to the backend
* A result section that displays:
  * Submitted flight information
  * Predicted delay probability (in percentage)
  * Suggested alternative flights with potentially lower delay chances

### UI Preview



https://github.com/user-attachments/assets/389f64df-8a11-4b82-8fa3-68bb46299d1c



***

## Project Structure

```
FlyCast/
├── app/
│   ├── pred_model/
│   │   ├── flight_delay_model.pkl
│   │   └── model_columns.pkl
│   ├── venv/
│   ├── app.py               # Flask backend
│   ├── index.html           # Frontend UI
│   └── script.js            # JavaScript logic
├── model/
│   ├── data/
│   │   └── flight_sample_3m.csv
│   ├── flight_cancellation_prediction.ipynb
│   └── flight_delay_prediction.ipynb
├── .gitignore
└── README.md
```

***

## How It Works

### Model

The model is trained using the following features:

* AIRLINE
* ORIGIN
* DEST
* MONTH
* DAY_OF_WEEK (1 = Monday, ..., 7 = Sunday)
* DEP_HOUR

The model and its training columns are saved using `joblib`:

```python
joblib.dump(model, 'flight_delay_model.pkl')
joblib.dump(model_columns, 'model_columns.pkl')
```

### Backend (Flask)

* Accepts JSON input via POST request
* One-hot encodes the input data
* Aligns data columns with columns used during model training
* Returns delay probability as JSON response

Example prediction endpoint:

```python
@app.route('/predict', methods=['POST'])
def predict():
    ...
    return jsonify({
        'delay_probability': round(prediction, 4),
        'delay_percent': f"{prediction * 100:.2f}%"
    })
```

### Frontend

* HTML form for user input
* JavaScript handles form submission asynchronously
* Sends fetch request to backend API
* Displays delay percentage with color-coded feedback to user

***

## Getting Started

### Prerequisites

* Python 3.7 or higher
* pip (Python package installer)

### Installation

1. Clone the repository

```bash
git clone https://github.com/vishwa-aloka-16/FlyCast.git
cd FlyCast
```

2. Create and activate a virtual environment

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

3. Install project dependencies

```bash
pip install -r requirements.txt
```

4. Run the Flask backend server

```bash
cd app
python app.py
```

The backend server will start running at `http://localhost:5000`.

***

## Frontend Usage

1. Open `app/index.html` in your preferred web browser.
2. Fill in the flight details in the form.
3. Click **Check Flight Delay**.
4. View the predicted delay probability and alternative flight suggestions on the screen.

***

## API Example

**Endpoint:** `POST /predict`  
**Content-Type:** `application/json`

**Request Body:**

```json
{
  "AIRLINE": "DL",
  "ORIGIN": "LAX",
  "DEST": "JFK",
  "MONTH": 8,
  "DAY_OF_WEEK": 4,
  "DEP_HOUR": 14
}
```

**Response:**

```json
{
  "delay_probability": 0.4508,
  "delay_percent": "45.08%"
}
```

***

## Model Performance

The flight delay prediction model was evaluated on a test dataset and achieved the following results:

| Class        | Precision | Recall | F1-Score | Support  |
|--------------|-----------|--------|----------|----------|
| 0 (On-time)  | 0.96      | 0.95   | 0.96     | 481,638  |
| 1 (Delayed)  | 0.78      | 0.81   | 0.80     | 102,534  |

**Overall Metrics:**

* Accuracy: 0.93  
* Macro Average Precision: 0.87  
* Macro Average Recall: 0.88  
* Macro Average F1-Score: 0.88  
* Weighted Average Precision: 0.93  
* Weighted Average Recall: 0.93  
* Weighted Average F1-Score: 0.93  

**Confusion Matrix:**

|               | Predicted 0 | Predicted 1 |
|---------------|-------------|-------------|
| Actual 0      | 458,776     | 22,862      |
| Actual 1      | 19,758      | 82,776      |

***

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

***
