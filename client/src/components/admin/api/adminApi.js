import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/admin`,
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
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/getallusers");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/user/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.essage;
  }
};
export const updateUser = async (id) => {
  try {
    const response = await apiClient.patch(`/user/update/${id}`);
    return response.data;
  } catch (error) {
    return error.essage;
  }
};
export const getAllContacts = async () => {
  try {
    const response = await apiClient.get("/getallcontacts");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const createReply = async (id, data) => {
  try {
    const response = await apiClient.post(`/create/${id}`, data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getRepllies = async () => {
  try {
    const response = await apiClient.get("/getreplies");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteReply = async (id) => {
  try {
    const response = await apiClient.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateReply = async (id, data) => {
  try {
    const response = await apiClient.put(`/update/${id}`, data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
