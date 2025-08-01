# Flight Delay Prediction with Logistic Regression

This project uses logistic regression to predict flight cancellations based on the airline, origin, and destination. The dataset has been processed and simplified for demonstration purposes. The original dataset cannot be uploaded, but a reduced version is available in the `data/flight_delays_test.csv` file.

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

The model is trained to predict the probability of flight cancellations using logistic regression. It uses a simplified dataset where categorical variables such as `Airline`, `Origin`, and `Destination` are encoded into numeric values. The model's performance is evaluated using classification metrics such as confusion matrix and classification report.

### Data

The dataset used for this project has been reduced for performance and simplicity. The original dataset, containing detailed flight data, cannot be uploaded due to privacy or file size restrictions. A subset of this data is available in the `data/flight_delays_test.csv` file for use in the model.

### Code Overview

1. **Load and Process Data:**

   * The data is loaded from a CSV file using `pandas`.
   * The relevant columns (`Airline`, `Origin`, `Destination`, `Cancelled`) are selected and stored in `delay_df`.
   * The `Cancelled` column is converted from boolean to integer (`0` for not cancelled, `1` for cancelled).

2. **Label Encoding:**

   * Categorical variables (`Airline`, `Origin`, `Destination`) are encoded into numeric values using `LabelEncoder`.

3. **Model Training and Prediction:**

   * The features `Airline`, `Origin`, and `Destination` are one-hot encoded using `pd.get_dummies`.
   * The data is split into training and testing sets (60% training, 40% testing) using `train_test_split`.
   * A logistic regression model is trained on the training data, and predictions are made on the test data.

4. **Model Evaluation:**

   * The confusion matrix and classification report are generated to evaluate the model's performance.
   * A heatmap of the confusion matrix is displayed using `seaborn` for better visualization.

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

5. The confusion matrix and classification report will be displayed in the terminal, and the confusion matrix will also be visualized in a heatmap.

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
Documantaion is AI grnarated (By Vishwa Aloka)
---

Feel free to adjust the repository name, paths, and other details as needed!
