import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/auth`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post("/register", userData);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const loginUser = async (loginInfo) => {
  try {
    const response = await apiClient.post("/login", loginInfo);
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.data.message;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/logout");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const verifyOtp = async (otp) => {
  try {
    const response = await apiClient.post("/verify-otp", otp);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient("/getuser");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
