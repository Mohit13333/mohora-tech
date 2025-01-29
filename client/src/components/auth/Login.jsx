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
        dispatch(setError(response));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <form onSubmit={handleLogin}>
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
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
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <NavLink
                  to="/register"
                  className="text-blue-500 hover:underline"
                >
                  Register
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
