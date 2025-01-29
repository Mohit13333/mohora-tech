import axios from "axios";
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/faqs`,
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

export const createFaq = async (data) => {
  try {
    const response = await apiClient.post("/create", data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data.message)
    return error.response.data.message;
  }
};

export const getAllFaqs = async () => {
  try {
    const response = await apiClient.get("/getall");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteFaqById = async (id) => {
  try {
    const response = await apiClient.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
export const updateFaqById = async (id,data) => {
  try {
    const response = await apiClient.patch(`/update/${id}`,data);
    return response.data;
  } catch (error) {
    // console.log(error.response.data.message)
    return error.response.data.message;
  }
};
