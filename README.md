#  CreditRisk AI

An end-to-end **Machine Learning Credit Risk Prediction System** that estimates the probability of loan default using applicant financial, loan, and credit-history information.

The project combines a **calibrated XGBoost model**, optimized decision threshold, **SHAP-based model explainability**, a **FastAPI backend**, and a responsive fintech-style web interface for real-time risk assessment.

---

##  Project Overview

Credit risk assessment is an important problem in financial lending. The goal of this project is to predict whether a loan applicant is likely to default based on historical applicant and loan information.

The complete workflow includes:

- Exploratory Data Analysis
- Data preprocessing
- Feature transformation
- Logistic Regression baseline
- XGBoost classification
- Hyperparameter tuning
- Probability calibration
- Decision-threshold optimization
- Model evaluation
- SHAP explainability
- Model serialization
- FastAPI integration
- Interactive frontend

The final application returns both a **default probability** and a **Low Risk / High Risk** classification.

---

##  Features

- Real-time credit-risk prediction
- XGBoost classification model
- Logistic Regression baseline comparison
- Hyperparameter tuning
- Probability calibration
- Optimized classification threshold
- SHAP-based model explainability
- Global feature importance analysis
- Automated preprocessing pipeline
- Automatic loan-to-income ratio calculation
- Interactive default-probability gauge
- Low Risk / High Risk assessment
- FastAPI REST API
- Responsive fintech dashboard
- Backend health monitoring

---

##  Machine Learning Workflow

### 1. Data Preparation

The dataset is cleaned and prepared before model training.

The preprocessing workflow handles:

- Numerical features
- Categorical features
- Missing values
- Feature transformations
- Train/test splitting

The preprocessing steps are integrated with the model using a Scikit-learn pipeline.

---

### 2. Exploratory Data Analysis

EDA is performed to understand:

- Applicant income distribution
- Loan amount distribution
- Loan purpose
- Loan grades
- Home ownership
- Interest rates
- Previous defaults
- Credit history
- Loan default distribution
- Relationships between features and loan default

---

### 3. Baseline Model

A **Logistic Regression** classifier is used as the baseline model.

This provides a reference point for evaluating the performance of more powerful models.

---

### 4. XGBoost Model

The main predictive model is built using **XGBoost**, a gradient-boosting algorithm effective for structured/tabular datasets.

The model learns relationships between applicant characteristics and loan-default outcomes.

---

### 5. Hyperparameter Tuning

Hyperparameter tuning is performed to improve the XGBoost model.

The tuned model is then selected for the final prediction pipeline.

---

### 6. Probability Calibration

Since the application displays the **probability of default**, probability calibration is applied to improve the reliability of the predicted probabilities.

The final classifier uses:

```text
CalibratedClassifierCV
        ↓
Preprocessing Pipeline
        ↓
XGBoost Classifier
```

---

### 7. Decision Threshold Optimization

Instead of relying only on the default classification threshold of `0.50`, the project evaluates precision and recall across different thresholds.

The F1-score is calculated using:

```text
F1 = 2 × (Precision × Recall) / (Precision + Recall)
```

The optimized threshold used by the saved model is approximately:

```text
0.6598
```

The application classifies applicants using:

```text
Probability >= Threshold
        ↓
     High Risk

Probability < Threshold
        ↓
      Low Risk
```

---

##  Explainable AI with SHAP

The project uses **SHAP (SHapley Additive exPlanations)** to improve model interpretability.

Machine-learning models such as XGBoost can be difficult to interpret directly. SHAP helps explain how individual features influence model predictions.

SHAP analysis can be used to understand:

- Global feature importance
- Features contributing to higher predicted default risk
- Features contributing to lower predicted default risk
- Individual feature contributions
- Relationships between features and model predictions

This adds an explainability layer to the credit-risk model instead of treating it purely as a black-box classifier.

---

##  Model Evaluation

The models are evaluated using multiple classification metrics:

- Accuracy
- Precision
- Recall
- F1-score
- Confusion Matrix
- Precision-Recall analysis

These metrics provide a more complete evaluation than accuracy alone, particularly for credit-risk classification where the classes may not be evenly distributed.

---

##  Model Inputs

The application accepts the following features:

| Feature | Description |
|---|---|
| `person_age` | Applicant age |
| `person_income` | Annual income |
| `person_home_ownership` | RENT, OWN, MORTGAGE or OTHER |
| `person_emp_length` | Employment length |
| `loan_intent` | Purpose of the loan |
| `loan_grade` | Loan grade from A to G |
| `loan_amnt` | Requested loan amount |
| `loan_int_rate` | Loan interest rate |
| `loan_percent_income` | Loan-to-income ratio |
| `cb_person_default_on_file` | Whether a previous default exists |
| `cb_person_cred_hist_length` | Credit-history length |

---

## 🛠️ Tech Stack

### Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- XGBoost
- SHAP
- Joblib

### Backend

- FastAPI
- Uvicorn
- Pydantic

### Frontend

- HTML5
- CSS3
- JavaScript

### Development

- Jupyter Notebook / Google Colab
- Git
- GitHub
- VS Code

---

## 🏗️ System Architecture

```text
             Applicant
                 │
                 ▼
        ┌─────────────────┐
        │   Web Interface │
        │ HTML / CSS / JS │
        └────────┬────────┘
                 │
                 │ JSON
                 ▼
        ┌─────────────────┐
        │     FastAPI     │
        │     Backend     │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │  Preprocessing  │
        │     Pipeline    │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │    Calibrated   │
        │     XGBoost     │
        └────────┬────────┘
                 │
                 ▼
         Default Probability
                 │
                 ▼
        Optimized Threshold
                 │
          ┌──────┴──────┐
          ▼             ▼
      Low Risk       High Risk
```

---

##  Project Structure

```text
credit_prediction_ml/
│
├── main.py
│
├── credit_risk_model.pkl
│
├── best_threshold.pkl
│
├── requirements.txt
├── README.md
│
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── notebook/
    └── credit_risk_prediction.ipynb
```

---

##  Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd credit_prediction_ml
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS / Linux

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

##  Running the Application

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Open the application:

```text
http://127.0.0.1:8000
```

---

## 📖 API Documentation

FastAPI automatically generates interactive API documentation.

### Swagger UI

```text
http://127.0.0.1:8000/docs
```

### Health Check

```text
GET /health
```

### Prediction Endpoint

```text
POST /predict
```

---

##  API Example

### Request

```json
{
    "person_age": 30,
    "person_income": 60000,
    "person_home_ownership": "RENT",
    "person_emp_length": 5,
    "loan_intent": "PERSONAL",
    "loan_grade": "B",
    "loan_amnt": 10000,
    "loan_int_rate": 11.5,
    "loan_percent_income": 0.17,
    "cb_person_default_on_file": "N",
    "cb_person_cred_hist_length": 6
}
```

### Response

```json
{
    "default_probability": 0.21,
    "default_prediction": 0,
    "threshold": 0.6598,
    "Result": "Low Risk"
}
```

---

##  Application Flow

```text
User enters applicant details
            ↓
JavaScript creates JSON request
            ↓
POST /predict
            ↓
FastAPI validates the request
            ↓
Saved preprocessing pipeline
            ↓
Calibrated XGBoost model
            ↓
Default probability
            ↓
Optimized decision threshold
            ↓
Low Risk / High Risk
            ↓
Interactive frontend visualization
```

---

##  Future Improvements

Potential improvements include:

- Applicant-level SHAP explanations directly in the web interface
- Interactive SHAP visualizations
- Prediction history
- Authentication
- Database integration
- Model monitoring
- Drift detection
- Fairness and bias evaluation
- Docker containerization
- Cloud deployment
- CI/CD pipeline
- Model versioning

---

##  Disclaimer

This project is developed for **educational and portfolio purposes**.

The model predictions should not be interpreted as financial advice or used as real-world lending decisions.

A production credit-risk system would require additional validation, fairness and bias testing, regulatory compliance, security controls, monitoring, and domain-expert review.

---

#  Author

**Mahi Singh**

B.Tech Student | Full Stack Developer | Machine Learning Enthusiast

---

# Support

If you find this project useful, consider giving the repository a ⭐.