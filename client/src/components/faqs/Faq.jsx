import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFaqs } from "./Api/faqApi";
import { setError, setfaqs } from "./slice/faqSlice";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const Faq = () => {
  const { faqs } = useSelector((state) => state.faqs);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});

  const getAllFaq = async () => {
    try {
      const response = await getAllFaqs();
      if (response.success) {
        dispatch(setfaqs(response.Faqs));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    getAllFaq();

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Two-column layout for larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Banner/Logo (Animated) */}
          <div
            className="lg:col-span-5 xl:col-span-4 hidden lg:block relative"
            data-animate
            id="left-banner"
          >
            <div className={`sticky top-24 transition-all duration-700 ease-in-out ${visibleSections['left-banner'] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 h-full flex flex-col items-center justify-center shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Need Help?
                  </h2>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Can't find what you're looking for? Our team is ready to assist you with any questions.
                  </p>
                  <a
                    href="mailto:mohoratechnologiespvtltd@gmail.com"
                  >
                    <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>📧</span>
                        <span>Contact Support</span>
                      </span>
                    </button>
                  </a>
                </div>
                <div className="w-full h-64 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl flex items-center justify-center border border-white/10">
                  <div className="text-8xl animate-float-gentle">❓</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - FAQ Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            {/* Header (Animated) */}
            <div
              className="mb-12"
              data-animate
              id="faq-header"
            >
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 transition-all duration-700 ease-in-out ${visibleSections['faq-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
              </h1>
              <p className={`text-lg text-slate-300 transition-all duration-700 ease-in-out delay-100 ${visibleSections['faq-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                Find answers to common questions about our products and services.
              </p>
            </div>

            {/* FAQ Items (Animated) */}
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={faq._id}
                  data-animate
                  id={`faq-item-${index}`}
                  className={`transition-all duration-700 ease-in-out delay-${(index % 3) * 100} ${visibleSections[`faq-item-${index}`]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                    }`}
                >
                  <div className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden transition-all duration-300 ${activeIndex === index
                    ? 'shadow-lg scale-[1.01]'
                    : 'shadow-md hover:scale-[1.005]'
                    }`}
                  >
                    <button
                      className={`w-full flex justify-between items-center p-6 text-left transition-all duration-300 ${activeIndex === index
                        ? 'bg-white/10'
                        : 'hover:bg-white/10'
                        }`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="font-medium text-white text-lg">{faq.title}</span>
                      <span className="text-slate-400 transition-transform duration-300">
                        {activeIndex === index ? (
                          <FiChevronDown className="transform rotate-180 transition-transform duration-300" />
                        ) : (
                          <FiChevronRight className="transform transition-transform duration-300" />
                        )}
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${activeIndex === index
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                        }`}
                    >
                      <div className="p-6 bg-white/5 text-slate-300 border-t border-white/10">
                        {faq.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
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

export default Faq;