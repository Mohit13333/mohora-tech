import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  // Mock navigation functions for demo
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Navigate to home when countdown reaches 0
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements - Mobile Optimized */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles - Adjusted for mobile */}
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-1 sm:w-2 h-1 sm:h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-20 sm:top-40 right-16 sm:right-32 w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-full animate-float-delay opacity-50"></div>
        <div className="absolute bottom-16 sm:bottom-32 left-20 sm:left-40 w-1 sm:w-2 h-1 sm:h-2 bg-pink-400 rounded-full animate-float-delay-2 opacity-70"></div>
        <div className="absolute top-32 sm:top-60 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-float-delay-3 opacity-80"></div>
        <div className="absolute bottom-20 sm:bottom-40 right-10 sm:right-20 w-1 sm:w-2 h-1 sm:h-2 bg-indigo-400 rounded-full animate-float opacity-40"></div>
        
        {/* Interactive Mouse Follower - Disabled on mobile */}
        <div 
          className="absolute pointer-events-none transition-all duration-1000 ease-out hidden sm:block"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
          }}
        ></div>

        {/* Gradient Orbs - Mobile Optimized */}
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow-delay"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        
        {/* 404 Number with Advanced Animation */}
        <div className="relative mb-6 sm:mb-8">
          <h1 className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift relative">
              4
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm opacity-50 animate-gradient-shift-delay"></span>
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift-delay mx-2 sm:mx-4 relative">
              0
              <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent blur-sm opacity-50 animate-gradient-shift"></span>
            </span>
            <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient-shift-delay-2 relative">
              4
              <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent blur-sm opacity-50 animate-gradient-shift-delay"></span>
            </span>
          </h1>
        </div>

        {/* Error Message */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 px-8">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-fade-in-up">
            Oops! Page Not Found
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto animate-fade-in-up-delay leading-relaxed px-2">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, even the best explorers sometimes take a wrong turn.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8 sm:mb-12 relative px-8">
          <div className="w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 mx-auto relative animate-float-gentle">
            {/* Placeholder for astronaut/space theme */}
            <div className="w-full h-full bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 animate-pulse-gentle"></div>
              
              {/* Astronaut Icon */}
              <div className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl animate-bounce-gentle">🚀</div>
              
              {/* Orbiting Elements - Adjusted for mobile */}
              <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-2 sm:w-4 h-2 sm:h-4 bg-yellow-400 rounded-full animate-orbit opacity-80"></div>
              <div className="absolute top-6 sm:top-12 right-6 sm:right-12 w-2 sm:w-3 h-2 sm:h-3 bg-cyan-400 rounded-full animate-orbit-reverse opacity-60"></div>
              <div className="absolute bottom-8 sm:bottom-16 left-8 sm:left-16 w-1 sm:w-2 h-1 sm:h-2 bg-pink-400 rounded-full animate-orbit-slow opacity-70"></div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-8">
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto group relative px-8 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>🏠</span>
              <span>Go Home</span>
            </span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto group relative px-8 sm:px-8 py-3 sm:py-4 bg-slate-800/50 border border-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-slate-700/50 hover:border-slate-500 backdrop-blur-sm"
          >
            <span className="flex items-center justify-center space-x-2">
              <span>⬅️</span>
              <span>Go Back</span>
            </span>
          </button>
        </div>

        {/* Auto Redirect Countdown */}
        <div className="text-slate-400 animate-fade-in-up-delay-2 px-8">
          <p className="text-sm sm:text-base">
            Automatically redirecting to home page in 
            <span className="font-bold text-blue-400 mx-1 text-base sm:text-lg animate-pulse">
              {countdown}
            </span> 
            seconds
          </p>
          <div className="w-48 sm:w-64 h-1 bg-slate-700 rounded-full mx-auto mt-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((10 - countdown) / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }

        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(80px) rotate(360deg); }
        }

        @keyframes orbit-slow {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-gradient-shift {
          background-size: 300% 300%;
          animation: gradient-shift 3s ease infinite;
        }

        .animate-gradient-shift-delay {
          background-size: 300% 300%;
          animation: gradient-shift 3s ease infinite 0.5s;
        }

        .animate-gradient-shift-delay-2 {
          background-size: 300% 300%;
          animation: gradient-shift 3s ease infinite 1s;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float 6s ease-in-out infinite 1s;
        }

        .animate-float-delay-2 {
          animation: float 6s ease-in-out infinite 2s;
        }

        .animate-float-delay-3 {
          animation: float 6s ease-in-out infinite 3s;
        }

        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }

        .animate-orbit {
          animation: orbit 20s linear infinite;
        }

        .animate-orbit-reverse {
          animation: orbit-reverse 15s linear infinite;
        }

        .animate-orbit-slow {
          animation: orbit-slow 25s linear infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 0.8s ease-out 0.3s both;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 0.8s ease-out 0.6s both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delay {
          animation: pulse-slow 4s ease-in-out infinite 2s;
        }

        .animate-pulse-gentle {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;