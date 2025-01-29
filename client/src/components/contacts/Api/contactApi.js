import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/contacts`,
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

export const createContact = async (contactData) => {
  try {
    const response = await apiClient.post("/create",contactData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    return error.response.data.message;
  }
};

export const getContactByUserId = async () => {
  try {
    const response = await apiClient.get("/getbyuserid");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteContactById = async (id) => {
  try {
    const response = await apiClient.delete(`/deletebyuserid/${id}`);
    console.log(response)
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
