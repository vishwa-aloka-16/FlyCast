---

# Flight Delay and Cancellation Prediction

This repository contains two machine learning projects focused on:

* Flight Delay Prediction
* Flight Cancellation Prediction

The objective is to apply supervised learning techniques to historical flight data to predict whether a flight will be delayed or canceled. These models are intended to support airline operations and enhance customer service planning.

---

## Project Structure

```
.
├── flight_delay_prediction.ipynb
├── flight_cancellation_prediction.ipynb
├── README.md
├── requirements.txt (optional)
└── data/
```

---

## Features

### Flight Delay Prediction

* Data preprocessing and feature engineering
* Classification of flights as delayed or on-time
* Training using Logistic Regression, Random Forest, etc.
* Evaluation metrics including accuracy, precision, recall, and F1-score

### Flight Cancellation Prediction

* Binary classification of flights as canceled or not
* Data cleaning, encoding, and transformation
* Model comparison and validation
* Visual analytics and feature importance plots

---

## Technologies Used

* Python
* NumPy, Pandas
* Scikit-learn
* Matplotlib, Seaborn
* Jupyter Notebook

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vishwa-aloka-16/flycast
cd flight-delay-cancellation-prediction
```

### 2. (Optional) Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Required Packages

```bash
pip install -r requirements.txt
```

### 4. Run the Notebooks

Open `flight_delay_prediction.ipynb` and `flight_cancellation_prediction.ipynb` using Jupyter Notebook or a compatible IDE like Visual Studio Code.

---

## Results Summary

The following are the performance metrics for the **Flight Cancellation Prediction Model**:

### Classification Report:

| Class            | Precision | Recall | F1-Score | Support |
| ---------------- | --------- | ------ | -------- | ------- |
| 0 (Not Canceled) | 0.89      | 0.64   | 0.74     | 481,638 |
| 1 (Canceled)     | 0.27      | 0.62   | 0.37     | 102,534 |

**Overall Accuracy:** 63%
**Macro Average F1-Score:** 56%
**Weighted Average F1-Score:** 68%

### Confusion Matrix:

```
[[307237 174401]
 [ 39110  63424]]
```

* True Negatives: 307,237
* False Positives: 174,401
* False Negatives: 39,110
* True Positives: 63,424

---

## Dataset

Data used in this project can be sourced from:

* [Kaggle](https://www.kaggle.com)

---

## Potential Improvements

* Incorporate additional features (e.g., weather conditions, air traffic)
* Explore time-series models for temporal dependencies
* Build an interactive dashboard or API for real-time predictions

---

## Author

**Vishwa Aloka Bandara**
Aspiring Data Scientist | Open to internship opportunities

---

## License

This project is a property of vishwa aloka

---
