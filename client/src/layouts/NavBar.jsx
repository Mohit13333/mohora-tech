import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

const navLinks = [
  { path: "/", name: "Home", icon: "🏠" },
  { path: "/about", name: "About Us", icon: "👨‍💼" },
  { path: "/services", name: "Services", icon: "💻" },
  { path: "/careers", name: "Careers", icon: "💼" },
  { path: "/case-studies", name: "Case Studies", icon: "📈" },
  { path: "/contact", name: "Contact", icon: "✉️" },
];


  const renderNavLink = ({ path, name, icon }, isMobile = false) => (
    <NavLink
      key={path}
      to={path}
      className={({ isActive }) => 
        `flex items-center ${isMobile ? 'px-4 py-3 text-base' : 'px-4 py-2.5 text-sm'} 
        font-medium transition-all duration-300 group transform hover:scale-[1.02]
        ${isActive 
          ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
          : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20'
        }
        ${isMobile ? 'rounded-xl' : 'rounded-lg hover:shadow-lg'}`
      }
      onClick={isMobile ? toggleMenu : undefined}
    >
      <span className="relative z-10 flex items-center">
        <span className={`${isMobile ? 'mr-3' : 'mr-2'}`}>{icon}</span>
        <span>{name}</span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
      {isMobile && (
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      )}
    </NavLink>
  );

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 shadow-xl' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <NavLink to="/">
                <img
                  src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
                  alt="MOHORA TECH"
                  className="h-auto w-40 drop-shadow-lg transition-transform duration-300 hover:scale-105"
                />
              </NavLink>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex items-center space-x-2">
              {navLinks.map(link => renderNavLink(link))}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="text-2xl sm:hidden text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300 group"
              onClick={toggleMenu}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <FaBars 
                  className={`absolute transition-all duration-300 ${
                    isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  } group-hover:scale-110`} 
                />
                <FaTimes 
                  className={`absolute transition-all duration-300 ${
                    isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  } group-hover:scale-110`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 sm:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Side Navbar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 sm:hidden transform transition-transform duration-500 ease-in-out shadow-2xl border-r border-slate-700/50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <NavLink to="/" onClick={toggleMenu}>
              <img
                src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
                alt="MOHORA TECH"
                className="h-auto w-32"
              />
            </NavLink>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
            {navLinks.map(link => renderNavLink(link, true))}
          </div>

          {/* Mobile Footer */}
          <div className="p-6 border-t border-slate-700/50">
            <div className="text-center text-slate-400 text-sm">
              © {new Date().getFullYear()} Mohora Technologies
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;