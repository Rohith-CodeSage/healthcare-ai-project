import React from 'react';

function ResultDisplay({ result }) {
  if (!result) return null;

  const isDiabetes = result.prediction_label === 'Diabetes';
  const confidencePercent = (result.confidence * 100).toFixed(2);

  return (
    <div className={`mt-8 p-6 rounded-lg shadow-lg ${isDiabetes ? 'bg-red-100 border border-red-300' : 'bg-green-100 border border-green-300'}`}>
      <h3 className="text-xl font-semibold text-center mb-4">
        Prediction Result
      </h3>
      <div className="text-center">
        <p className={`text-4xl font-bold ${isDiabetes ? 'text-red-600' : 'text-green-600'}`}>
          {result.prediction_label}
        </p>
        <p className="text-lg text-gray-700 mt-2">
          Confidence: <span className="font-bold">{confidencePercent}%</span>
        </p>
      </div>
    </div>
  );
}

export default ResultDisplay;