from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import predict  # Imports the router from app/api/predict.py

app = FastAPI(
    title="Healthcare AI API",
    description="API for predicting patient outcomes.",
    version="1.0.0"
)

# --- CORS Middleware ---
# This allows your React frontend (on localhost:3000)
# to make requests to this backend (on localhost:8000)
origins = [
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# --- Include API Routers ---
# This tells the main app to use the routes defined in app/api/predict.py
app.include_router(predict.router)

# --- Root Endpoint ---
# A simple endpoint to check if the server is running
@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Healthcare AI API. Go to /docs for documentation."}