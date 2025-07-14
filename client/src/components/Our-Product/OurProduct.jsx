import React from "react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "All-in-One POS System",
      description: "Complete restaurant management solution with integrated payment processing, inventory tracking, and customer management. Perfect for full-service restaurants, cafes, and bars.",
      features: [
        "Cloud-based order management",
        "Real-time inventory tracking",
        "Customer loyalty programs",
        "Multi-location support",
        "Advanced reporting & analytics",
        "Staff scheduling & payroll"
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      category: "POS Systems",
      price: "₹25,000/month",
      highlight: true,
      badge: "Most Popular"
    },
    {
      id: 2,
      name: "Mobile POS Solution",
      description: "Tablet-based POS system for food trucks, outdoor events, and pop-up restaurants. Lightweight, portable, and fully featured.",
      features: [
        "Tablet & smartphone compatible",
        "Offline mode capability",
        "Mobile payment processing",
        "Quick setup & deployment",
        "Battery optimization",
        "Compact receipt printing"
      ],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&crop=center",
      category: "Mobile POS",
      price: "₹8,000/month"
    },
    {
      id: 3,
      name: "Online Ordering Platform",
      description: "Comprehensive online ordering system with website integration, mobile app, and delivery management capabilities.",
      features: [
        "Custom branded website",
        "Mobile app development",
        "Delivery tracking",
        "Online payment gateway",
        "Customer reviews system",
        "Social media integration"
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop&crop=center",
      category: "Online Ordering",
      price: "₹18,000/month"
    },
  ];

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
              Restaurant <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">POS Solutions</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto animate-fade-in-up-delay leading-relaxed">
              Comprehensive point-of-sale systems and restaurant management tools designed to streamline operations, boost efficiency, and enhance customer experience.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-8 pb-20">
          <div className="mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                      {product.badge}
                    </div>
                  )}

                  {/* Image Container */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-slate-700/50 to-slate-800/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative flex flex-col flex-grow">
                    {/* Category */}
                    <div className="absolute -top-6 left-6 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
                      <span className="text-white text-xs font-medium">{product.category}</span>
                    </div>

                    <div className="pt-8 flex flex-col flex-grow">
                      <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                        {product.name}
                      </h2>

                      <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                        {product.description}
                      </p>

                      {/* Technical Details */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-slate-800/30 rounded-lg p-3">
                          <div className="text-xs text-slate-400 mb-1">Setup Time</div>
                          <div className="text-sm text-white font-medium">{product.setupTime}</div>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-3">
                          <div className="text-xs text-slate-400 mb-1">Platform</div>
                          <div className="text-sm text-white font-medium">{product.compatibility}</div>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-3">
                          <div className="text-xs text-slate-400 mb-1">Support</div>
                          <div className="text-sm text-white font-medium">{product.support}</div>
                        </div>
                        <div className="bg-slate-800/30 rounded-lg p-3">
                          <div className="text-xs text-slate-400 mb-1">Training</div>
                          <div className="text-sm text-white font-medium">{product.training}</div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="mb-6 flex-grow">
                        <h4 className="text-sm font-medium text-white mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {product.features.slice(0, 4).map((feature, i) => (
                            <li key={i} className="flex items-start text-sm">
                              <span className="text-blue-400 mr-2 mt-1">✓</span>
                              <span className="text-slate-300">{feature}</span>
                            </li>
                          ))}
                          {product.features.length > 4 && (
                            <li className="text-blue-400 text-sm font-medium">
                              +{product.features.length - 4} more features
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Price and CTA */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {product.price}
                          </div>
                          <div className="text-xs text-slate-400">per month</div>
                        </div>
                        <button className="group/btn relative w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                          <span className="relative z-10 text-sm">Get Started</span>
                        </button>
                      </div>
                    </div>

                    {/* Bottom Gradient Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enterprise CTA */}
            <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl border border-white/10 p-8 lg:p-12 max-w-4xl mx-auto">
                <div className="text-6xl mb-6 animate-float-gentle">🍽️</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Ready to Transform Your Restaurant?
                </h3>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of restaurants worldwide who trust our POS solutions to streamline operations, increase revenue, and deliver exceptional customer experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>🚀</span>
                      <span>Start Free Trial</span>
                    </span>
                  </button>
                  <button className="group relative px-8 py-4 bg-transparent border-2 border-white/20 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:border-white/40 hover:bg-white/5">
                    <span className="flex items-center justify-center space-x-2">
                      <span>📞</span>
                      <span>Schedule Demo</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
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

export default Products;