import React, { useState, useEffect } from 'react';

/**
 * PreLoader Component
 * Loading screen shown during initial page load
 */
const PreLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center">
        {/* Logo or Text */}
        <h1 className="text-4xl font-bold text-primary-600 mb-8 animate-pulse">
          Dinni Rahmawati
        </h1>

        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default PreLoader;
