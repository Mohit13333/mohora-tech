import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser, setUser } from "./slice/authSlice";
import { createUser, verifyOtp } from "./api/authApi";
import { NavLink, useNavigate } from "react-router-dom";
import {
  setError,
  setSuccess,
  setLoading,
} from "../global/globalSlice/GlobalSlice";

const Signup = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.global);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [otp, setOtp] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(setError(null));
    dispatch(setSuccess(null));
    dispatch(setLoading(true));
    try {
      const response = await createUser(formData);
      console.log(response);
      if (response.success) {
        dispatch(setSuccess(response.message));
        setStep(2);
      } else {
        dispatch(setError(response));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    dispatch(setError(null));
    dispatch(setSuccess(null));
    dispatch(setLoading(true));
    try {
      const response = await verifyOtp({ email: formData.email, otp });
      console.log(response);
      if (response.success) {
        dispatch(setUser(response.user));
        dispatch(setLoggedInUser(true));
        dispatch(setSuccess(response.message));
        navigate("/")
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        setStep(1);
        setFormData({ name: "", email: "", phoneNumber: "", password: "" });
        setOtp("");
      } else {
        dispatch(setError(response));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {step === 1 && (
          <form onSubmit={handleSignup}>
            <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?
                <NavLink to="/login" className="text-blue-500 hover:underline">
                  Login
                </NavLink>
              </p>
            </div>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleOtpVerification}>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Verify OTP
            </h2>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter the OTP"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
