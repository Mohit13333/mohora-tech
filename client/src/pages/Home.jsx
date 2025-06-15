import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Mock navigation function
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechCorp Inc.",
      role: "CTO",
      content: "Mohora Technologies transformed our entire digital infrastructure. Their expertise and dedication exceeded all expectations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c433?w=150&h=150&fit=crop&crop=face&auto=format"
    },
    {
      name: "Michael Chen",
      company: "StartupXYZ",
      role: "Founder",
      content: "The custom software solution they built for us increased our efficiency by 300%. Incredible results!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format"
    },
    {
      name: "Emily Rodriguez",
      company: "GlobalTech",
      role: "Director of IT",
      content: "Professional, reliable, and innovative. Mohora Technologies is our go-to partner for all technology solutions.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format"
    },
    {
      name: "David Kumar",
      company: "InnovateNow",
      role: "CEO",
      content: "Outstanding service and cutting-edge solutions. They truly understand what modern businesses need.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "150+", label: "Happy Clients" },
    { number: "50+", label: "Expert Team Members" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        </div>

        <div className="relative z-10 px-10 text-center">
          <div className="mb-8">
            <div className="h-16 w-auto mx-auto mb-6 animate-fade-in flex items-center justify-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mohora Technologies Pvt Ltd
              </h1>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Innovative Solutions for
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block mt-2">
              Modern Challenges
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto animate-fade-in-up-delay leading-relaxed">
            Transform your business with cutting-edge technology solutions. We specialize in digital transformation,
            custom software development, and strategic consulting to help you stay ahead in the digital age.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delay-2">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <span>📞</span>
                <span>Book Demo Call</span>
              </span>
            </button>
            <Link to="/services">
              <button
              onClick={() => navigate('/services')}
                className="group relative px-8 py-4 bg-slate-800/50 border border-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-slate-700/50 hover:border-slate-500 backdrop-blur-sm"
              >
                <span className="flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Our Services</span>
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 transform hover:scale-105 transition-all duration-300"
                data-animate
                id={`stat-${index}`}
              >
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 relative">
        <div className="px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Mohora Technologies?</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                We combine technical expertise with business acumen to deliver solutions that drive real results.
                Our team of experts is committed to your success.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Expert Team</h4>
                    <p className="text-slate-400">Certified professionals with years of industry experience.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">24/7 Support</h4>
                    <p className="text-slate-400">Round-the-clock support to ensure your business never stops.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Proven Results</h4>
                    <p className="text-slate-400">Track record of successful projects and satisfied clients.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="text-8xl animate-float-gentle">💼</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              What Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Clients Say</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Cards Container */}
            <div className="relative overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-12 shadow-2xl">
                      {/* Profile Section */}
                      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-xl"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg">💼</span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left">
                          {/* Stars */}
                          <div className="mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-2xl animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>⭐</span>
                            ))}
                          </div>

                          {/* Quote */}
                          <blockquote className="text-lg lg:text-xl text-slate-200 mb-8 leading-relaxed italic">
                            "{testimonial.content}"
                          </blockquote>

                          {/* Profile Info */}
                          <div>
                            <div className="font-bold text-white text-xl mb-1">
                              {testimonial.name}
                            </div>
                            <div className="text-blue-400 font-medium text-lg mb-1">
                              {testimonial.role}
                            </div>
                            <div className="text-slate-400">
                              {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
            >
              <span className="text-xl group-hover:scale-125 transition-transform">←</span>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
            >
              <span className="text-xl group-hover:scale-125 transition-transform">→</span>
            </button>

            {/* Testimonial Dots */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-125 shadow-lg'
                      : 'bg-slate-600 hover:bg-slate-500 hover:scale-110'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl border border-white/10 p-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your digital transformation goals.
              Schedule a free consultation with our experts today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>📅</span>
                  <span>Schedule Free Consultation</span>
                </span>
              </button>

              <button className="group relative px-8 py-4 bg-slate-800/50 border border-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-slate-700/50 hover:border-slate-500 backdrop-blur-sm">
                <span className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>Contact Us</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

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

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 0.8s ease-out 0.6s both;
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
      `}</style>
    </div>
  );
};

export default Home;