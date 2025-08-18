# **FlyCast – Flight Delay Prediction Web Application**

**FlyCast** is a web-based application that predicts the probability of a flight being delayed based on airline, origin, destination, departure time, and date.
It uses a machine learning model trained on historical U.S. domestic flight data to deliver real-time predictions and suggest alternative flights with lower delay chances.

---

## **Features**

* Predicts flight delay probability from user input.
* Powered by an **XGBoost Classifier** trained on historical data.
* Flask backend for API handling and model inference.
* Frontend built with HTML, CSS, and JavaScript.
* Dynamic asynchronous form submission.
* Color-coded delay probability feedback.
* Alternative flight suggestions with lower delay probability.
* CORS enabled for cross-origin requests.

---

## **User Interface**

The interface provides:

* A flight details form (Airline, Origin, Destination, Date, Time).
* **Check Flight Delay** button to trigger the API call.
* A results section showing delay probability and alternative flights.

📷 **UI Preview**

https://www.linkedin.com/posts/vishwaaloka_machinelearning-webdevelopment-predictiveanalytics-activity-7363131836576796674-qRgh?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAADalqwcBZ-UMsCXpGTKdJF9xL5RcgmyKz5s 

<img width="1899" height="907" alt="image" src="https://github.com/user-attachments/assets/e3fa7695-c7bd-4723-8b74-b277b40aac42" />

<img width="1898" height="806" alt="Screenshot 2025-08-15 180404" src="https://github.com/user-attachments/assets/25c3ebf8-78f6-446c-a2b5-0185fa515e7c" />

<img width="1896" height="906" alt="Screenshot 2025-08-15 180429" src="https://github.com/user-attachments/assets/8f744d64-0015-45d2-b9b3-2d041ce8bd37" />


---

## **Project Structure**

```
FlyCast/
├── app/
│   ├── pred_model/
│   │   ├── flight_delay_model.pkl
│   │   ├── flight_prediction_api.py
│   │   └── model_columns.pkl
│   ├── src/
│   │   ├── airline.png
│   │   ├── flightData.js
│   │   ├── index.html
│   │   ├── script.js
│   │   └── style.css
├── model/
│   ├── data/
│   │   └── flight_sample_3m.csv
│   ├── flight_cancellation_prediction.ipynb
│   └── flight_delay_prediction.ipynb
├── .gitignore
└── README.md
```

---

## **How It Works**

### **1. Model**

* Trained on the following features:

  * **AIRLINE**, **ORIGIN**, **DEST**, **MONTH**, **DAY\_OF\_WEEK**, **DEP\_HOUR**
* Saved using `joblib`:

```python
joblib.dump(model, 'flight_delay_model.pkl')
joblib.dump(model_columns, 'model_columns.pkl')
```

### **2. Backend (Flask)**

* Accepts JSON POST requests.
* One-hot encodes input and aligns columns to training format.
* Returns delay probability and prediction class.

**Example Flask Endpoint:**

```python
@app.route('/predict', methods=['POST'])
def predict():
    ...
    return jsonify({
        'delay_probability': round(prediction, 4),
        'prediction': int(prediction_class)
    })
```

### **3. Frontend**

* HTML + CSS for UI.
* JavaScript (`fetch`) sends user input to the API.
* Displays delay percentage with colored indicators.

---

## **Getting Started**

**Prerequisites**

* Python 3.7+
* pip package manager

**Installation**

```bash
# Clone repository
git clone https://github.com/vishwa-aloka-16/FlyCast.git
cd FlyCast

# Create and activate virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Flask server
cd app
python flight_prediction_api.py
```

Server will run at **[http://localhost:5000](http://localhost:5000)**

---

## **Frontend Usage**

1. Open `app/src/index.html` in your browser.
2. Fill in the flight details.
3. Click **Check Flight Delay**.
4. View results and alternative suggestions.

---

## **API Example**

**Endpoint:** `POST /predict`
**Request:**

```json
{
  "MONTH": 8,
  "DAY_OF_WEEK": 7,
  "DEP_HOUR": 8,
  "DISTANCE": 2475,
  "DELAY_DUE_CARRIER": 0,
  "DELAY_DUE_WEATHER": 0,
  "DELAY_DUE_NAS": 0,
  "AIRLINE_DL": 1,
  "ORIGIN_LAX": 1,
  "DEST_JFK": 1
}
```

**Response:**

```json
{
  "delay_probability": 0.2067,
  "prediction": 0
}
```

---

## **Updated API**

The new frontend now transforms raw user input into model-ready features before sending it to `/predict`.

| Frontend Field | Backend Feature(s) | Transformation                                                    |
| -------------- | ------------------ | ----------------------------------------------------------------- |
| `date`         | `MONTH`            | Extract month (1–12).                                             |
| `date`         | `DAY_OF_WEEK`      | Extract day of week (Mon=1, Sun=7).                               |
| `time`         | `DEP_HOUR`         | Extract hour (0–23) from time.                                    |
| `dep` + `arr`  | `DISTANCE`         | Lookup airport-to-airport distance.                               |
| `airline`      | `AIRLINE_<CODE>`   | One-hot encode airline code.                                      |
| `dep`          | `ORIGIN_<CODE>`    | One-hot encode origin airport.                                    |
| `arr`          | `DEST_<CODE>`      | One-hot encode destination airport.                               |
| Checkboxes     | Delay cause fields | Map to `DELAY_DUE_CARRIER`, `DELAY_DUE_WEATHER`, `DELAY_DUE_NAS`. |

**Example Conversion:**

*Form Input:*

```json
{
  "dep": "LAX",
  "arr": "JFK",
  "airline": "DL",
  "date": "2025-08-15",
  "time": "08:00",
  "airports": false,
  "weather": false,
  "nas": false
}
```

*Backend Payload:*

```json
{
  "MONTH": 8,
  "DAY_OF_WEEK": 5,
  "DEP_HOUR": 8,
  "DISTANCE": 2475,
  "DELAY_DUE_CARRIER": 0,
  "DELAY_DUE_WEATHER": 0,
  "DELAY_DUE_NAS": 0,
  "AIRLINE_DL": 1,
  "ORIGIN_LAX": 1,
  "DEST_JFK": 1
}
```

---

## **Model Performance**

| Class       | Precision | Recall | F1-Score | Support |
| ----------- | --------- | ------ | -------- | ------- |
| On-time (0) | 0.96      | 0.95   | 0.96     | 481,638 |
| Delayed (1) | 0.78      | 0.81   | 0.80     | 102,534 |

**Overall Accuracy:** 93%

---

## **License**

Licensed under the MIT License – see [LICENSE](LICENSE).

---
