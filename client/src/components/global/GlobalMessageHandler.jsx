import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetUI } from "./globalSlice/GlobalSlice";
import { AiOutlineClose } from "react-icons/ai";

const GlobalMessageHandler = ({ children }) => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.global);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(resetUI()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleClose = () => {
    dispatch(resetUI());
  };

  return (
    <>
      {loading && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-md shadow-lg flex items-center space-x-2">
          <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce-200"></div>
          <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce-400"></div>
          <span className="text-blue-700">Loading...</span>
        </div>
      )}
      {(error || success) && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 max-w-sm w-full ${
            error ? "bg-red-100 border-red-300 text-red-700" : "bg-green-100 border-green-300 text-green-700"
          } border p-4 rounded-md shadow-md flex items-center justify-between`}
        >
          <span>{error || success}</span>
          <button
            onClick={handleClose}
            className="ml-4 text-gray-700 hover:text-gray-900"
            aria-label="Close notification"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      )}
      {children}
    </>
  );
};

export default GlobalMessageHandler;
