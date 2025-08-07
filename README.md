# FlyCast - Flight Delay Prediction Web Application

FlyCast is a web-based application that predicts the probability of a flight being delayed based on airline, origin, destination, departure time, and date. It uses a machine learning model trained on historical US domestic flight data and provides users with real-time predictions and alternative flight suggestions.

---

## Features

* Predicts flight delay probability based on user input
* Uses a trained machine learning model (`RandomForestClassifier`)
* Flask backend handles API requests and model inference
* Frontend built with HTML, CSS, and JavaScript
* Dynamic form processing and display using JavaScript
* Delay probability displayed with color-coded feedback
* Suggests alternative flights with lower delay chances
* Cross-Origin support enabled using Flask-CORS

---

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

<img width="1893" height="904" alt="image" src="https://github.com/user-attachments/assets/7dde6af5-7b1a-4006-88d3-631adb4ae5ad" />


---

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
│   │   └── flight_delays_test.csv
│   ├── flight_cancellation_prediction.ipynb
│   └── flight_delay_prediction.ipynb
├── .gitignore
└── README.md
```

---

## How It Works

### Model

The model is trained using the following features:

* AIRLINE
* ORIGIN
* DEST
* MONTH
* DAY\_OF\_WEEK (1 = Monday, ..., 7 = Sunday)
* DEP\_HOUR

Saved using `joblib`:

```python
joblib.dump(model, 'flight_delay_model.pkl')
joblib.dump(model_columns, 'model_columns.pkl')
```

### Backend (Flask)

* Accepts JSON input
* One-hot encodes the data
* Aligns columns with model training columns
* Returns delay probability

Example:

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

* HTML form for input
* JavaScript handles form submission
* Sends a fetch request to Flask API
* Displays delay percentage and color-coded feedback

---

## Getting Started

### Prerequisites

* Python 3.7+
* pip

### Installation

1. Clone the repository

```bash
git clone https://github.com/vishwa-aloka-16/FlyCast.git
cd FlyCast
```

2. Create and activate virtual environment

```bash
python -m venv venv
venv\Scripts\activate   # On Windows
```

3. Install dependencies

```bash
pip install -r requirements.txt
```

4. Run Flask server

```bash
cd app
python app.py
```

The backend will run at `http://localhost:5000`.

---

## Frontend Usage

1. Open `app/index.html` in your browser
2. Fill in flight details and click **Check Flight Delay**
3. View the prediction and suggestions on the right

---

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

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
