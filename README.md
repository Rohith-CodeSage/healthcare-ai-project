# Healthcare AI Project

This project uses FastAPI for the backend, React for the frontend, and Docker to run everything.

## How to Run

1.  **Train Model:**
    * Place your `diabetes.csv` file in the `data/` folder.
    * Run the `backend/notebooks/1.0-Data-Exploration-and-Training.ipynb` notebook.
    * This will create `diabetes_model.pkl` and `diabetes_scaler.pkl` in `backend/ml_models/`.

2.  **Run Application:**
    * From this root folder, run:
    * `docker-compose up --build`

* **Frontend:** `http://localhost:3000`
* **Backend Docs:** `http://localhost:8000/docs`