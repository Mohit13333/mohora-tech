import React, { useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    "Corporate Certifications",
    "Product Design and Development", 
    "Web App Development",
    "Mobile App Development"
  ];

  const importantLinks = [
    "Privacy Policy",
    "Refund & Cancellations",
    "Terms & Conditions", 
    "Hall of Fame",
    "Certifications"
  ];

  const contactInfo = [
    {
      label: "Contact Email",
      value: "mohoratechnologiespvtltd@gmail.com",
      href: "mailto:mohoratechnologiespvtltd@gmail.com",
      icon: "📧"
    },
    {
      label: "Phone",
      value: "+91 9065269192", 
      href: "tel:+919065269192",
      icon: "📱"
    },
    {
      label: "Business Hours",
      value: "Mon to Fri (09:00 am – 06:00 pm)",
      icon: "🕒"
    },
    {
      label: "Support Team",
      value: "mohoratechnologiespvtltd@gmail.com",
      href: "mailto:mohoratechnologiespvtltd@gmail.com", 
      icon: "🛠️"
    },
    {
      label: "Sales Team",
      value: "mohoratechnologiespvtltd@gmail.com",
      href: "mailto:mohoratechnologiespvtltd@gmail.com",
      icon: "💼"
    },
    {
      label: "Business Inquiries", 
      value: "mohoratechnologiespvtltd@gmail.com",
      href: "mailto:mohoratechnologiespvtltd@gmail.com",
      icon: "🤝"
    }
  ];

const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/15uk7YtaNK/",
    icon: <FaFacebook />,
    gradient: "from-blue-600 to-blue-500"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/mohoratechnologies/",
    icon: <FaInstagram />,
    gradient: "from-pink-600 to-purple-500"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/mohora-techonologies-pvt-ltd/",
    icon: <FaLinkedin />,
    gradient: "from-blue-700 to-blue-600"
  }
];

  return (
    <footer 
      id="footer"
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-600/8 to-pink-600/8 rounded-full blur-2xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-cyan-600/8 to-blue-600/8 rounded-full blur-xl animate-pulse-gentle"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 px-8 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          
          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Contact Information
              </span>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li 
                  key={index}
                  className="group flex items-start space-x-3 text-sm animate-fade-in-stagger"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-slate-400 text-xs mb-1">{item.label}:</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-slate-300 hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1 block break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-slate-300">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Our Services
              </span>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li 
                  key={index}
                  className="group flex items-center space-x-3 text-sm cursor-pointer animate-fade-in-stagger"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-150 group-hover:bg-purple-400 transition-all duration-300"></span>
                  <span className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Important Links
              </span>
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {importantLinks.map((link, index) => (
                <li 
                  key={index}
                  className="group flex items-center space-x-3 text-sm cursor-pointer animate-fade-in-stagger"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-150 group-hover:bg-purple-400 transition-all duration-300"></span>
                  <span className="text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Logo & Social */}
          <div className="space-y-8 flex flex-col items-center lg:items-start">
            {/* Logo */}
            <div className="text-center lg:text-left">
              <div className="group cursor-pointer">
                <img
                  src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
                  alt="Mohora Technologies Logo"
                  className="h-16 w-auto mx-auto lg:mx-0 mb-4 group-hover:scale-105 transition-transform duration-300 animate-float-gentle"
                />
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Mohora Technologies
                </h3>
                <p className="text-slate-400 text-sm mt-2">
                  Pvt Ltd
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4">
              <h5 className="text-white font-semibold text-center lg:text-left">Follow Us</h5>
              <div className="flex justify-center lg:justify-start space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-bounce-gentle overflow-hidden`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="text-white text-lg group-hover:scale-125 transition-transform duration-300 relative z-10">
                      {social.icon}
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="text-slate-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Mohora Technologies Pvt Ltd. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-slate-500">Crafted with</span>
              <span className="text-red-400 animate-pulse text-lg">❤️</span>
              <span className="text-slate-500">for innovation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fade-in-stagger {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
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
          animation: fade-in-up 0.8s ease-out both;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.6s ease-out both;
        }

        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
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
    </footer>
  );
};

export default Footer;