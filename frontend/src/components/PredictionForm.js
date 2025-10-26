import React, { useState } from 'react';
import { postPrediction } from '../services/api';
import ResultDisplay from './ResultDisplay';

const initialFormData = {
  Pregnancies: 1,
  Glucose: 120.0,
  BloodPressure: 70.0,
  SkinThickness: 20.0,
  Insulin: 80.0,
  BMI: 32.0,
  DiabetesPedigreeFunction: 0.47,
  Age: 33,
};

const fieldLabels = {
  Pregnancies: "Pregnancies",
  Glucose: "Glucose Level",
  BloodPressure: "Blood Pressure (mm Hg)",
  SkinThickness: "Skin Thickness (mm)",
  Insulin: "Insulin (mu U/ml)",
  BMI: "Body Mass Index (BMI)",
  DiabetesPedigreeFunction: "Diabetes Pedigree Function",
  Age: "Age (years)",
};

function PredictionForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await postPrediction(formData);
      setResult(response.data);
    } catch (err) {
      setError('Failed to get prediction. Is the backend server running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Diabetes Prediction Model
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {Object.keys(initialFormData).map((key) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                {fieldLabels[key]}
              </label>
              <input
                type="number"
                name={key}
                id={key}
                value={formData[key]}
                onChange={handleChange}
                step={key === 'DiabetesPedigreeFunction' ? '0.001' : '0.1'}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-1/2 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {isLoading ? 'Predicting...' : 'Get Prediction'}
          </button>
        </div>
      </form>

      {error && <div className="mt-6 p-4 text-center text-red-800 bg-red-100 border border-red-300 rounded-md">{error}</div>}
      
      {result && <ResultDisplay result={result} />}
    </div>
  );
}

export default PredictionForm;