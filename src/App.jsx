import React from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-primary-600">
          🚀 React + Vite Setup Complete!
        </h1>
        <p className="text-xl text-neutral-600">
          Phase 1 successful - Ready to start building components
        </p>
        <div className="flex gap-4 justify-center">
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
            ✓ React Installed
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
            ✓ Vite Configured
          </span>
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
            ✓ TailwindCSS Ready
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
