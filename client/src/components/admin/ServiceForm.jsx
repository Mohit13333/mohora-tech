import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createService,
  deleteServiceById,
  getAllServices,
  updateServiceById,
} from "../services/Api/serviceApi";
import { setServices } from "../services/slice/serviceSlice";
import {
  setLoading,
  setError,
  setSuccess,
} from "../global/globalSlice/GlobalSlice";

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    file: null,
  });
  const [serviceToEdit, setServiceToEdit] = useState(null);

  const { services } = useSelector((state) => state.services);

  const dispatch = useDispatch();

  const fetchServices = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getAllServices();
      if (response.success) {
        dispatch(setServices(response.services));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (serviceToEdit) {
      setFormData({
        title: serviceToEdit.title,
        description: serviceToEdit.description,
        price: serviceToEdit.price,
        file: null,
      });
    }
  }, [serviceToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    if (formData.file) {
      form.append("avatar", formData.file);
    }

    try {
      let response;
      if (serviceToEdit) {
        response = await updateServiceById(serviceToEdit._id, form);
      } else {
        response = await createService(form);
      }

      if (response.success) {
        dispatch(setSuccess(response.message));
        setFormData({
          title: "",
          description: "",
          price: "",
          file: null,
        });
        setServiceToEdit(null);
        fetchServices();
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const cancelEdit = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      file: null,
    });
    setServiceToEdit(null);
  };

  const deleteService = async (id) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteServiceById(id);
      if (response.success) {
        dispatch(setSuccess(response.message));
        fetchServices();
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row p-4 md:p-6">
      <div className="max-w-md mx-auto h-fit p-4 rounded-lg shadow-md md:w-1/4 mb-4 md:mr-4">
        <h2 className="text-xl font-bold mb-4">
          {serviceToEdit ? "Update Service" : "Create Service"}
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            required
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            placeholder="Title"
          />
          <textarea
            name="description"
            value={formData.description}
            required
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            placeholder="Description"
            rows="3"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            required
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            placeholder="Price"
          />
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white w-1/2 mr-2"
            >
              {serviceToEdit ? "Update" : "Create"}
            </button>
            {serviceToEdit && (
              <button
                type="button"
                onClick={cancelEdit}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 w-1/2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="w-full md:w-3/4 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Services List</h1>
        <div className="space-y-4">
          {services && services.length > 0 ? (
            services.map((service) => (
              <div
                key={service._id}
                className="border border-gray-300 rounded-md shadow-sm"
              >
                <div className="flex justify-between items-center p-4 bg-gray-100">
                  <span className="font-medium">{service.title}</span>
                  <div>
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setServiceToEdit(service)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline ml-2"
                      onClick={() => deleteService(service._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-600">{service.description}</p>
                  <p className="font-semibold">Price: ₹{service.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No services available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
