import joblib
import numpy as np

# Load the model and scaler
try:
    # Paths are relative to the root of the backend folder, where uvicorn will run
    model = joblib.load('ml_models/diabetes_model.pkl')
    scaler = joblib.load('ml_models/diabetes_scaler.pkl')
except FileNotFoundError:
    print("ERROR: Model/scaler files not found. Make sure you run the notebook first.")
    model = None
    scaler = None

def make_prediction(input_data):
    if model is None or scaler is None:
        return {"error": "Model not loaded. Please train the model first."}

    # 1. Convert input data to a 2D numpy array
    data_array = np.array([[
        input_data.Pregnancies,
        input_data.Glucose,
        input_data.BloodPressure,
        input_data.SkinThickness,
        input_data.Insulin,
        input_data.BMI,
        input_data.DiabetesPedigreeFunction,
        input_data.Age
    ]])

    # 2. Scale the data
    scaled_data = scaler.transform(data_array)

    # 3. Make prediction
    prediction_raw = model.predict(scaled_data)
    prediction_prob = model.predict_proba(scaled_data)

    # 4. Format the output
    result = int(prediction_raw[0])
    confidence = float(prediction_prob[0][result])

    return {
        "prediction_value": result,
        "prediction_label": "Diabetes" if result == 1 else "No Diabetes",
        "confidence": confidence
    }