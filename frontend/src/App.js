import React from 'react';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-blue-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Healthcare Predictive Analytics
        </h1>
      </header>

      <main className="container mx-auto p-4 mt-8">
        <PredictionForm />
      </main>
    </div>
  );
}

export default App;