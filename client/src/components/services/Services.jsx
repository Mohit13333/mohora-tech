import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "./slice/serviceSlice";
import { getAllServices } from "./Api/serviceApi";

const ServicePage = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
    
  const fetchServices = async () => {
    try {
      const data = await getAllServices();
      console.log(data);
      dispatch(setServices(data.services));
    } catch (error) {
      console.error("Failed to fetch services:", error.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
        <div className="pt-20 pb-12 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto animate-fade-in-up-delay leading-relaxed">
              Discover our comprehensive range of professional services designed to transform your business and drive innovation.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            {services?.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 animate-float-gentle">🔧</div>
                <p className="text-xl text-slate-300 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 max-w-md mx-auto">
                  No services available at the moment. Please check back later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {services?.map((service, index) => (
                  <div
                    key={service?._id}
                    className="group max-w-xs w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 mx-auto animate-fade-in-up"
                    style={{animationDelay: `${index * 0.1}s`}}
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
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            ₹{service?.price}
                          </div>
                          
                          <button className="group/btn relative px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                            <span className="relative z-10 text-sm">Learn More</span>
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
      `}</style>
    </div>
  );
};

export default ServicePage;