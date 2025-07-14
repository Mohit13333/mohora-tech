import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "./slice/serviceSlice";
import { getAllServices, createBooking } from "./Api/serviceApi";
import {
  setError,
  setLoading,
  setSuccess,
} from "../global/globalSlice/GlobalSlice";

const ServicePage = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  const { loggedInUser, user } = useSelector((state) => state.auth);
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    budget: "",
    requirements: "",
    message: ""
  });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showBookingForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showBookingForm]);

  const fetchServices = async () => {
    try {
      const data = await getAllServices();
      dispatch(setServices(data.services));
    } catch (error) {
      dispatch(setError("Failed to fetch services"));
    }
  };

  useEffect(() => {
    fetchServices();
  }, [dispatch, loggedInUser, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));
    
    try {
      const bookingData = {
        serviceId: selectedService._id,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        bookingDetails: {
          budget: formData.budget,
          preferredDate: formData.date,
          message: formData.message,
          specialRequirements: formData.requirements,
        },
      };

      const response = await createBooking(bookingData);
      if (response.success) {
        dispatch(setSuccess("Booking created successfully!"));
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          date: "",
          budget: "",
          requirements: "",
          message: ""
        });
        setShowBookingForm(false);
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError("Failed to create booking. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const openBookingForm = (service) => {
    setSelectedService(service);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
      date: "",
      budget: "",
      requirements: "",
      message: ""
    });
    setShowBookingForm(true);
  };

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get date 3 months from now for max date
  const getMaxDate = () => {
    const today = new Date();
    const threeMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    return threeMonthsFromNow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="pt-20 pb-12 px-8">
          <div className="mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto animate-fade-in-up-delay leading-relaxed">
              Discover our comprehensive range of professional services designed to transform your business and drive innovation.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-8 pb-20">
          <div className="mx-auto">
            {services?.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 animate-float-gentle">🔧</div>
                <p className="text-xl text-slate-300 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-md mx-auto">
                  No services available at the moment. Please check back later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
                {services?.map((service, index) => (
                  <div
                    key={service?._id}
                    className="group w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 mx-auto animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image Container */}
                    <div className="relative w-full h-48 bg-gradient-to-br from-slate-700/50 to-slate-800/50 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <img
                        src={service?.avatar}
                        alt={service?.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Overlay Effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                      {/* Service Icon */}
                      <div className="absolute -top-6 left-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl">🚀</span>
                      </div>

                      <div className="pt-8">
                        <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                          {service?.title}
                        </h2>

                        <p className="text-slate-300 mb-6 leading-relaxed text-sm">
                          {service?.description}
                        </p>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between">
                          <button 
                            onClick={() => openBookingForm(service)}
                            className="group/btn relative px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                            <span className="relative z-10 text-sm">Book Now</span>
                          </button>
                        </div>
                      </div>

                      {/* Bottom Gradient Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl w-full max-w-2xl animate-fade-in-up max-h-[95vh] flex flex-col">
            
            {/* Modal Header - Fixed */}
            <div className="flex-shrink-0 p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  Book {selectedService?.title}
                </h2>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-slate-300 hover:text-white transition-colors duration-300 text-2xl w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-3 text-white"
                    >
                      <span className="flex items-center space-x-2">
                        <span className="text-blue-400">👤</span>
                        <span>Full Name</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      required
                      placeholder="Enter Your Name"
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-3 text-white"
                    >
                      <span className="flex items-center space-x-2">
                        <span className="text-purple-400">📧</span>
                        <span>Email</span>
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      id="email"
                      placeholder="Enter Your Email"
                      required
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-3 text-white"
                    >
                      <span className="flex items-center space-x-2">
                        <span className="text-cyan-400">📞</span>
                        <span>Phone Number</span>
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      required
                      placeholder="Enter Your Phone Number"
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium mb-3 text-white"
                    >
                      <span className="flex items-center space-x-2">
                        <span className="text-green-400">💰</span>
                        <span>Budget (INR)</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      required
                      placeholder="Enter Your Budget"
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-3 text-white"
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-yellow-400">🏠</span>
                      <span>Address</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    required
                    placeholder="Enter Your Address"
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 backdrop-blur-sm"
                  />
                </div>

                {/* Enhanced Date Picker */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium mb-3 text-white"
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-pink-400">📅</span>
                      <span>Preferred Date</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      required
                      min={getTodayDate()}
                      max={getMaxDate()}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-300 backdrop-blur-sm relative z-10"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 pointer-events-none">
                      📅
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    * You can book appointments from today up to 3 months in advance
                  </p>
                </div>

                {/* Special Requirements */}
                <div>
                  <label
                    htmlFor="requirements"
                    className="block text-sm font-medium mb-3 text-white"
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-orange-400">✨</span>
                      <span>Special Requirements</span>
                    </span>
                  </label>
                  <textarea
                    name="requirements"
                    id="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 backdrop-blur-sm resize-none"
                    rows="3"
                    placeholder="Any special requests or requirements..."
                  ></textarea>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-3 text-white"
                  >
                    <span className="flex items-center space-x-2">
                      <span className="text-indigo-400">💬</span>
                      <span>Message</span>
                    </span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 backdrop-blur-sm resize-none"
                    rows="3"
                    placeholder="Additional information about your booking..."
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Modal Footer - Fixed */}
            <div className="flex-shrink-0 p-6 border-t border-white/10">
              <button
                onClick={handleBookingSubmit}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>📅</span>
                  <span>Confirm Booking</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

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

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 0.8s ease-out 0.3s both;
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

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
        }

        /* Custom scrollbar for modal */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }

        /* Better date input styling */
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }

        input[type="date"]::-webkit-inner-spin-button,
        input[type="date"]::-webkit-clear-button {
          display: none;
        }

        input[type="date"]::-webkit-datetime-edit-fields-wrapper {
          padding: 0;
        }

        input[type="date"]::-webkit-datetime-edit-text {
          color: #94a3b8;
          padding: 0 4px;
        }

        input[type="date"]::-webkit-datetime-edit-month-field,
        input[type="date"]::-webkit-datetime-edit-day-field,
        input[type="date"]::-webkit-datetime-edit-year-field {
          color: #ffffff;
        }

        input[type="date"]:focus::-webkit-datetime-edit-month-field,
        input[type="date"]:focus::-webkit-datetime-edit-day-field,
        input[type="date"]:focus::-webkit-datetime-edit-year-field {
          color: #ec4899;
        }
      `}</style>
    </div>
  );
};

export default ServicePage;