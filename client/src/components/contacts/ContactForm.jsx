import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "./Api/contactApi";
import {
  setError,
  setLoading,
  setSuccess,
} from "../global/globalSlice/GlobalSlice";

const ContactForm = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await createContact(formData);
      console.log(response);
      if (response.success) {
        dispatch(setSuccess(response.message));
        setFormData({ phoneNumber: "", email: "", message: "" });
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
    <>
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-gentle"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 py-20">
          {/* Header Section */}
          <div className="text-center mb-12 px-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Contact <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto animate-fade-in-up-delay leading-relaxed">
              Get in touch with our expert team. We're here to help transform your business with innovative technology solutions.
            </p>
          </div>

          {/* Contact Form Container */}
          <div className="max-w-2xl mx-auto px-4 mb-12">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12 animate-fade-in-up">
              {loggedInUser ? (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className=" text-sm font-medium mb-3 text-white flex items-center space-x-2"
                      >
                        <span className="text-blue-400">📞</span>
                        <span>Phone Number</span>
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        required
                        placeholder="Enter Your Phone Number"
                        onChange={handleInputChange}
                        className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className=" text-sm font-medium mb-3 text-white flex items-center space-x-2"
                      >
                        <span className="text-purple-400">📧</span>
                        <span>Email</span>
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

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-medium mb-3 text-white flex items-center space-x-2"
                    >
                      <span className="text-cyan-400">💬</span>
                      <span>Message</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 backdrop-blur-sm resize-none"
                      rows="5"
                      required
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>🚀</span>
                      <span>Send Message</span>
                    </span>
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4 animate-float-gentle">📞</div>
                    <h3 className="text-2xl text-white font-semibold mb-2">Get In Touch</h3>
                    <p className="text-slate-300">Connect with our team through any of these channels</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information Cards */}
                    <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white">📧</span>
                        </div>
                        <h4 className="text-white font-semibold">Email Contact</h4>
                      </div>
                      <a
                        href="mailto:mohoratechnologiespvtltd@gmail.com"
                        className="text-blue-300 hover:text-blue-200 transition-colors duration-300 text-sm break-all"
                      >
                        mohoratechnologiespvtltd@gmail.com
                      </a>
                    </div>

                    <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-2xl border border-green-500/30 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white">📞</span>
                        </div>
                        <h4 className="text-white font-semibold">Phone</h4>
                      </div>
                      <a
                        href="tel:+919065269192"
                        className="text-green-300 hover:text-green-200 transition-colors duration-300 font-medium"
                      >
                        +91 9065269192
                      </a>
                      <p className="text-slate-400 text-sm mt-2">Mon to Fri (09:00 am – 09:00 pm)</p>
                    </div>
                  </div>

                  {/* Department Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm rounded-xl border border-purple-500/30 p-4 text-center">
                      <div className="text-2xl mb-2">🛠️</div>
                      <h5 className="text-white font-medium mb-2">Support Team</h5>
                      <a
                        href="mailto:mohoratechnologiespvtltd@gmail.com"
                        className="text-purple-300 hover:text-purple-200 transition-colors duration-300 text-xs"
                      >
                        Technical Support
                      </a>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 backdrop-blur-sm rounded-xl border border-cyan-500/30 p-4 text-center">
                      <div className="text-2xl mb-2">💼</div>
                      <h5 className="text-white font-medium mb-2">Sales Team</h5>
                      <a
                        href="mailto:mohoratechnologiespvtltd@gmail.com"
                        className="text-cyan-300 hover:text-cyan-200 transition-colors duration-300 text-xs"
                      >
                        Sales Inquiries
                      </a>
                    </div>

                    <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-xl border border-pink-500/30 p-4 text-center">
                      <div className="text-2xl mb-2">🚀</div>
                      <h5 className="text-white font-medium mb-2">Business</h5>
                      <a
                        href="mailto:mohoratechnologiespvtltd@gmail.com"
                        className="text-pink-300 hover:text-pink-200 transition-colors duration-300 text-xs"
                      >
                        Partnerships
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map Section
          <section className="max-w-6xl mx-auto px-4">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 animate-fade-in-up-delay">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Visit Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Office</span>
                </h3>
                <p className="text-slate-300">Find us on the map and plan your visit</p>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.3986938159082!2d84.7439328!3d26.507298999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993259476acb7b5%3A0xc1885ab1c4a9623d!2sMohit%20Singh%20House&#39;s!5e0!3m2!1sen!2sin!4v1731336654143!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  allowFullScreen
                  className="filter brightness-90 contrast-110"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </section> */}
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
        `}</style>
      </main>
    </>
  );
};

export default ContactForm;