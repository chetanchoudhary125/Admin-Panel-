// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

 function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-4 text-gray-700">
          Oops! Page not found
        </p>
        <p className="text-gray-500 mt-2">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound

