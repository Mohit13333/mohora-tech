import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/services`,
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
export const createService = async (formData) => {
  try {
    const response = await apiClient.post("/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};

export const getAllServices = async () => {
  try {
    const response = await apiClient.get("/getAll");
    console.log(response)
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await apiClient.get(`/get/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};

export const deleteServiceById = async (id) => {
  try {
    const response = await apiClient.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};

export const updateServiceById = async (id, formData) => {
  try {
    const response = await apiClient.put(`/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return error.response?.data?.message || error.message;
  }
};
