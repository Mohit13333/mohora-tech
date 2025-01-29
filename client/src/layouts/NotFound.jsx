import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-bold animate-pulse bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">404</h1>
        <p className="text-4xl font-semibold text-gray-800 mb-2">
          Oops! Page Not Found
        </p>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </button>
      </div>
      <img
        src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"
        alt="404 Illustration"
        className="mt-10 w-96"
      />
    </div>
  );
};

export default NotFound;