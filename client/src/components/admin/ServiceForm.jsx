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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(6); // 6 services per page for better layout

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
      setIsFormVisible(true);
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
        setIsFormVisible(false);
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
    setIsFormVisible(false);
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

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      setServiceToEdit(null);
      setFormData({
        title: "",
        description: "",
        price: "",
        file: null,
      });
    }
  };

  // Pagination Logic
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services?.slice(indexOfFirstService, indexOfLastService) || [];
  const totalPages = Math.ceil((services?.length || 0) / servicesPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset to first page when services change
  useEffect(() => {
    setCurrentPage(1);
  }, [services?.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Mobile Form Toggle Button */}
        <button
          onClick={toggleForm}
          className="lg:hidden fixed top-4 right-4 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl hover:scale-110 transition-all duration-300"
        >
          {isFormVisible ? '×' : '+'}
        </button>

        {/* Form Section */}
        <div className={`
          fixed lg:relative top-0 right-0 h-full w-full lg:w-1/3 xl:w-1/4 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl
          transform transition-transform duration-500 ease-in-out z-40
          ${isFormVisible ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 h-full overflow-y-auto">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {serviceToEdit ? "✏️ Update Service" : "🚀 Create Service"}
                </h2>
                <button
                  onClick={toggleForm}
                  className="lg:hidden w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-slate-300 font-medium">Service Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    required
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter service title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    required
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Describe your service"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 font-medium">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    required
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter price"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 font-medium">Service Image</label>
                  <div className="relative">
                    <input
                      type="file"
                      name="avatar"
                      onChange={handleFileChange}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white hover:file:from-blue-700 hover:file:to-purple-700 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className="group relative flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10">
                      {serviceToEdit ? "💾 Update Service" : "🚀 Create Service"}
                    </span>
                  </button>
                  
                  {serviceToEdit && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 py-4 px-6 bg-slate-700/50 border border-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-slate-600/50 backdrop-blur-sm"
                    >
                      ❌ Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Services List Section */}
        <div className="flex-1 p-6 lg:pr-8">
          <div className="max-w-6xl mx-auto">
            {/* Header with pagination info */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-4">
                Discover our comprehensive range of technology solutions designed to transform your business
              </p>
              {services && services.length > 0 && (
                <div className="text-slate-400 text-sm">
                  Showing {indexOfFirstService + 1}-{Math.min(indexOfLastService, services.length)} of {services.length} services
                </div>
              )}
            </div>

            {/* Pagination */}
            {services && services.length > servicesPerPage && (
              <div className="flex flex-col items-center space-y-6">
                {/* Pagination Numbers */}
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 hover:from-blue-600/30 hover:to-purple-600/30 hover:scale-110'
                    }`}
                  >
                    ←
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                    // Show first page, current page and neighbors, last page
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                            currentPage === pageNumber
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                              : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 hover:from-blue-600/30 hover:to-purple-600/30 hover:scale-110'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 ||
                      pageNumber === currentPage + 2
                    ) {
                      return (
                        <span key={pageNumber} className="text-slate-500 px-2">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  {/* Next Button */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 hover:from-blue-600/30 hover:to-purple-600/30 hover:scale-110'
                    }`}
                  >
                    →
                  </button>
                </div>

                {/* Quick Navigation */}
                <div className="flex items-center space-x-4 text-sm">
                  <button
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? 'text-slate-600 cursor-not-allowed'
                        : 'text-blue-400 hover:text-blue-300 hover:bg-blue-600/10'
                    }`}
                  >
                    First
                  </button>
                  
                  <span className="text-slate-400 px-2">•</span>
                  
                  <span className="text-slate-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <span className="text-slate-400 px-2">•</span>
                  
                  <button
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'text-slate-600 cursor-not-allowed'
                        : 'text-blue-400 hover:text-blue-300 hover:bg-blue-600/10'
                    }`}
                  >
                    Last
                  </button>
                </div>
              </div>
            )}

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {currentServices && currentServices.length > 0 ? (
                currentServices.map((service, index) => (
                  <div
                    key={service._id}
                    className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Service Header */}
                    <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-3xl">💼</div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setServiceToEdit(service)}
                              className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-full flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                              title="Edit Service"
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => deleteService(service._id)}
                              className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-110"
                              title="Delete Service"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6">
                      <p className="text-slate-300 mb-6 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          ₹{service.price}
                        </div>
                        <div className="text-slate-400 text-sm">
                          💰 Starting from
                        </div>
                      </div>
                    </div>

                    {/* Service Footer */}
                    <div className="px-6 pb-6">
                      <button className="w-full py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 font-semibold rounded-xl transition-all duration-300 hover:from-blue-600/30 hover:to-purple-600/30 hover:border-blue-400/50 hover:text-blue-200 backdrop-blur-sm">
                        📞 Get Quote
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="text-8xl mb-6 animate-float-gentle">📋</div>
                  <h3 className="text-2xl font-bold text-white mb-4">No Services Yet</h3>
                  <p className="text-slate-400 mb-6">Start by creating your first service offering</p>
                  <button
                    onClick={toggleForm}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    <span>🚀</span>
                    <span>Create First Service</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isFormVisible && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={toggleForm}
        />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.02); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }

        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delay {
          animation: pulse-slow 4s ease-in-out infinite 2s;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ServiceForm;