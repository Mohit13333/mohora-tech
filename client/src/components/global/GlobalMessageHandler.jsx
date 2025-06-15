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
      {/* Loading Message */}
      {loading && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] animate-slide-down">
          <div className="bg-gradient-to-r from-slate-800/95 to-slate-700/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 flex items-center space-x-4 min-w-80">
            {/* Loading Icon */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            
            {/* Loading Text */}
            <span className="text-white font-medium">Processing your request...</span>
          </div>
        </div>
      )}

      {/* Success/Error Messages */}
      {(error || success) && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] animate-slide-down">
          <div className={`backdrop-blur-xl border rounded-2xl shadow-2xl p-6 flex items-center justify-between min-w-80 max-w-md ${
            error 
              ? "bg-gradient-to-r from-red-900/90 to-red-800/90 border-red-500/30" 
              : "bg-gradient-to-r from-green-900/90 to-green-800/90 border-green-500/30"
          }`}>
            <div className="flex items-center space-x-4">
              {/* Service Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                error 
                  ? "bg-gradient-to-r from-red-500 to-red-600" 
                  : "bg-gradient-to-r from-green-500 to-green-600"
              } shadow-lg`}>
                <span className="text-white text-xl">
                  {error ? "⚠️" : "✅"}
                </span>
              </div>
              
              {/* Message */}
              <div className="flex-1">
                <div className={`font-medium ${
                  error ? "text-red-100" : "text-green-100"
                }`}>
                  {error ? "Service Alert" : "Service Update"}
                </div>
                <div className={`text-sm ${
                  error ? "text-red-200" : "text-green-200"
                } mt-1`}>
                  {error || success}
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className={`ml-4 p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                error 
                  ? "text-red-200 hover:bg-red-800/50 hover:text-red-100" 
                  : "text-green-200 hover:bg-green-800/50 hover:text-green-100"
              }`}
              aria-label="Close notification"
            >
              <AiOutlineClose size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Children */}
      {children}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translate(-50%, -20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out;
        }

        /* Ensure proper stacking context */
        .z-[9999] {
          z-index: 9999;
        }
      `}</style>
    </>
  );
};

export default GlobalMessageHandler;