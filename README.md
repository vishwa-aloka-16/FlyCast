# Flight Delay Prediction with Logistic Regression (Basic Version)

This project serves as a basic version of a larger flight delay prediction system, where logistic regression is used to predict flight cancellations based on the airline, origin, and destination. The dataset has been simplified for this demonstration, with the original data being unavailable for upload. A reduced version of the dataset is available in the `data/flight_delays_test.csv` file.

## Requirements

To run this project, you'll need the following libraries:

* `pandas`
* `scikit-learn`
* `seaborn`
* `matplotlib`

You can install the required libraries using the following command:

```bash
pip install pandas scikit-learn seaborn matplotlib
```

## Project Overview

This basic version focuses on logistic regression for predicting flight cancellations, using a subset of features. The larger project will incorporate additional prediction features, such as flight delays, and a user integration system for personalized notifications and decision support.

### Data

The dataset used for this project has been reduced to fit the scope of the basic version. The original dataset, containing more detailed flight data, cannot be uploaded due to privacy or file size constraints. A simplified version of the dataset is available in the `data/flight_delays_test.csv` file.

### Code Overview

1. **Load and Process Data:**

   * The data is loaded from a CSV file using `pandas`.
   * Relevant columns (`Airline`, `Origin`, `Destination`, `Cancelled`) are selected.
   * The `Cancelled` column is converted from boolean to integer (`0` for not cancelled, `1` for cancelled).

2. **Label Encoding:**

   * Categorical variables (`Airline`, `Origin`, `Destination`) are encoded into numeric values using `LabelEncoder`.

3. **Model Training and Prediction:**

   * One-hot encoding is used for the features (`Airline`, `Origin`, `Destination`).
   * Data is split into training and testing sets (60% training, 40% testing).
   * Logistic regression is applied to predict flight cancellations.

4. **Model Evaluation:**

   * Confusion matrix and classification report are used to evaluate the model.
   * A heatmap visualization of the confusion matrix is displayed for better interpretation.

### Next Steps

This is the first step in a larger project aimed at predicting flight delays and providing user integration. The upcoming versions of this project will include:

* **Delay Prediction:** Extend the current model to predict actual delays, not just cancellations.
* **User Integration:** Build a system that allows users to input flight details and receive real-time predictions on cancellations and delays.

### Steps to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/flight-delay-prediction.git
   cd flight-delay-prediction
   ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Place the `flight_delays_test.csv` dataset in the `data/` folder.

4. Run the script:

   ```bash
   python flight_delay_prediction.py
   ```

5. The confusion matrix and classification report will be displayed, and a heatmap of the confusion matrix will be visualized.

### File Structure

```
flight-delay-prediction/
│
├── data/
│   └── flight_delays_test.csv      # Reduced dataset for testing
│
├── flight_delay_prediction.py      # Main Python script
├── requirements.txt               # Dependencies file
└── README.md                      # Project documentation
```

## License

Documantaion is genarated using Chat GPT (By Vishwa Aloka)

---
