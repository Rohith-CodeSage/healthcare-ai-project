from fastapi import APIRouter
from ..models.patient import PatientData
from ..services import ml_service

router = APIRouter()

@router.post("/predict", tags=["Prediction"])
def predict_outcome(patient_data: PatientData):
    """
    Takes patient data and returns a diabetes prediction.
    """
    prediction = ml_service.make_prediction(patient_data)
    return prediction