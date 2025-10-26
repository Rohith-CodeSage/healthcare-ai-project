import axios from 'axios';

// This defaults to http://localhost:8000, which is where our Docker backend runs
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const postPrediction = (patientData) => {
  return apiClient.post("/predict", patientData);
};