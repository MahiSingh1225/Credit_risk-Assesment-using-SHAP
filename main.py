from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from contextlib import asynccontextmanager
from pathlib import Path
import pandas as pd
import joblib



# Base directory


BASE_DIR = Path(__file__).resolve().parent


# Load ML model


ml_model = {}


@asynccontextmanager
async def lifespan(app: FastAPI):

    # Load model
    ml_model["model"] = joblib.load(
        BASE_DIR / "credit_risk_model.pkl"
    )

    # Load threshold
    ml_model["threshold"] = float(
        joblib.load(BASE_DIR / "best_threshold.pkl")
    )

    print("Model loaded successfully")
    print("Threshold:", ml_model["threshold"])

    yield

    # Clear model when server shuts down
    ml_model.clear()


# FastAPI App


app = FastAPI(
    title="Credit Risk Prediction API",
    lifespan=lifespan
)


# Input Schema


class LoanApplication(BaseModel):

    person_age: float
    person_income: float
    person_home_ownership: str
    person_emp_length: float

    loan_intent: str
    loan_grade: str
    loan_amnt: float
    loan_int_rate: float
    loan_percent_income: float

    cb_person_default_on_file: str
    cb_person_cred_hist_length: float



# Prediction API


@app.post("/predict")
def predict(data: LoanApplication):

    # Convert input into dataframe
    input_df = pd.DataFrame([
        data.model_dump()
    ])

    # Get probability from calibrated model
    probability = float(
        ml_model["model"].predict_proba(input_df)[0, 1]
    )

    # Get threshold
    threshold = ml_model["threshold"]

    # Final prediction
    prediction = int(probability >= threshold)

    # Risk result
    result = "High Risk" if prediction == 1 else "Low Risk"

    return {
        "default_probability": round(probability, 4),
        "default_prediction": prediction,
        "threshold": round(threshold, 4),
        "Result": result
    }



# Health Check


@app.get("/health")
def health():
    return {
        "status": "OK",
        "model_loaded": "model" in ml_model,
        "threshold": ml_model.get("threshold")
    }



# Frontend
# IMPORTANT: Keep this LAST

app.mount(
    "/",
    StaticFiles(
        directory=BASE_DIR / "static",
        html=True
    ),
    name="static"
)