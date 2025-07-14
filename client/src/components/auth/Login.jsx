import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setLoggedInUser, setUser } from "./slice/authSlice";
import { loginUser } from "./api/authApi";
import {
  setError,
  setSuccess,
  setLoading,
} from "../global/globalSlice/GlobalSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.global);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setError(null));
    dispatch(setSuccess(null));
    dispatch(setLoading(true));

    try {
      const response = await loginUser(formData);
      if (response.success) {
        dispatch(setUser(response.user));
        dispatch(setLoggedInUser(true));
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        dispatch(setSuccess(response.message));
        navigate("/");
      } else {
        dispatch(setError(response?.data?.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">

        {/* Desktop Layout */}
        <div className="hidden lg:flex h-[600px]">

          {/* Left Side - Company Branding */}
          <div className="flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-12 flex flex-col justify-center items-center relative overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10 text-center">
              <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
                <div className="h-20 w-full mx-auto mb-6 rounded-2xl flex items-center justify-center drop-shadow-2xl">
                  <div className="text-3xl font-bold text-white"><img src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg" alt="" srcset="" /></div>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
                Welcome Back!
              </h1>

              <p className="text-xl text-white/90 mb-8 animate-fade-in-delay">
                Your trusted partner in digital transformation
              </p>

              <div className="space-y-4 text-white/80">
                <div className="flex items-center justify-center space-x-3 animate-slide-in-left">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Innovative Solutions</span>
                </div>
                <div className="flex items-center justify-center space-x-3 animate-slide-in-left-delay">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Expert Team</span>
                </div>
                <div className="flex items-center justify-center space-x-3 animate-slide-in-left-delay-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex-1 p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              <form onSubmit={handleLogin} className="space-y-6">

                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">
                    Sign In
                  </h2>
                  <p className="text-slate-400 animate-fade-in-delay">
                    Access your account to continue
                  </p>
                </div>

                <div className="space-y-4">

                  {/* Email Input */}
                  <div className="relative group">
                    <label className="block text-slate-300 text-sm font-medium mb-2 transition-colors group-focus-within:text-blue-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-8 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-slate-800/70"
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Password Input */}
                  <div className="relative group">
                    <label className="block text-slate-300 text-sm font-medium mb-2 transition-colors group-focus-within:text-blue-400">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-8 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-slate-800/70 pr-12"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                      >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10">
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Logging in...</span>
                        </div>
                      ) : (
                        "Login"
                      )}
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-600"></div>
                    </div>
                  </div>

                  {/* Register Link */}
                  <div className="text-center pt-4">
                    <p className="text-slate-400">
                      Don't have an account?{" "}
                      <NavLink
                        to="/register"
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                      >
                        Register
                      </NavLink>
                    </p>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden min-h-screen flex flex-col">

          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="h-16 w-full mx-auto mb-6 rounded-2xl flex items-center justify-center drop-shadow-2xl">
                <div className="text-3xl font-bold text-white"><img src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg" alt="" srcset="" /></div>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Welcome Back!</h1>
              <p className="text-white/90">Sign in to your account</p>
            </div>
          </div>

          {/* Mobile Form */}
          <div className="flex-1 p-6">
            <form onSubmit={handleLogin} className="space-y-4">

              <div className="space-y-4">

                {/* Email Input */}
                <div className="relative group">
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-8 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-8 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Register Link */}
                <div className="text-center pt-4">
                  <p className="text-slate-400">
                    Don't have an account?{" "}
                    <NavLink
                      to="/register"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                    >
                      Register
                    </NavLink>
                  </p>
                </div>

              </div>
            </form>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out 0.4s both;
        }

        .animate-slide-in-left-delay {
          animation: slide-in-left 0.6s ease-out 0.6s both;
        }

        .animate-slide-in-left-delay-2 {
          animation: slide-in-left 0.6s ease-out 0.8s both;
        }
      `}</style>
    </div>
  );
};

export default Login;