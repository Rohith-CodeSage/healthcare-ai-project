from pydantic import BaseModel

class PatientData(BaseModel):
    # This must match the columns in your training data
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int