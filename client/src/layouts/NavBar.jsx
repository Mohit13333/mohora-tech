import React, { useState } from "react";
import { FaBars, FaBell, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedInUser, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if current route starts with /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Hide navbar on mobile for admin routes
  if (isAdminRoute) {
    return (
      <>
        {/* Desktop navbar - always visible */}
        <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl backdrop-blur-lg border-b border-slate-700/50 hidden sm:block">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center">
              <NavLink
                  to="/">
                <img
                  src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
                  alt="MOHORA TECH"
                  className="h-auto w-40 drop-shadow-lg transition-transform duration-300 hover:scale-105"
                />
                </NavLink>
              </div>

              {/* Desktop Navigation Links */}
              <div className="flex items-center space-x-1">
                <NavLink
                  to="/"
                  className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
                </NavLink>
                {user?.role === "admin" && (
                  <NavLink
                    to="/admin-dashboard"
                    className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
                  >
                    <span className="relative z-10">Admin Dashboard</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 to-teal-600/0 group-hover:from-emerald-600/20 group-hover:to-teal-600/20 rounded-lg transition-all duration-300"></div>
                  </NavLink>
                )}
                <NavLink
                  to="/services"
                  className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
                >
                  <span className="relative z-10">Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
                </NavLink>
                <NavLink
                  to="/contact"
                  className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
                >
                  <span className="relative z-10">Contact</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
                </NavLink>
                <NavLink
                  to="/faqs"
                  className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
                >
                  <span className="relative z-10">FAQs</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
                </NavLink>
                <NavLink
                  to="/careers"
                  className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
                >
                  <span className="relative z-10">Careers</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
                </NavLink>
              </div>

              {/* Desktop Login/Logout Links */}
              <div className="flex items-center space-x-3">
                {loggedInUser ? (
                  <>
                    <NavLink 
                      to="/contact-details" 
                      className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300 relative group"
                    >
                      <FaBell className="text-xl" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
                    </NavLink>
                    <NavLink
                      to="/logout"
                      className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="text-slate-200 hover:text-white border border-slate-600 hover:border-blue-500 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl backdrop-blur-lg border-b border-slate-700/50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
            <NavLink
             to="/">
              <img
                src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
                alt="MOHORA TECH"
                className="h-auto w-40 drop-shadow-lg transition-transform duration-300 hover:scale-105"
              />
              </NavLink>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex items-center space-x-1">
              <NavLink
                to="/"
                className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
              </NavLink>
              {user?.role === "admin" && (
                <NavLink
                  to="/admin-dashboard"
                  className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
                >
                  <span className="relative z-10">Admin Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 to-teal-600/0 group-hover:from-emerald-600/20 group-hover:to-teal-600/20 rounded-lg transition-all duration-300"></div>
                </NavLink>
              )}
              <NavLink
                to="/services"
                className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
              >
                <span className="relative z-10">Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
              </NavLink>
              <NavLink
                to="/contact"
                className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
              </NavLink>
              <NavLink
                to="/faqs"
                className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
              >
                <span className="relative z-10">FAQs</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
              </NavLink>
              <NavLink
                to="/careers"
                className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
              >
                <span className="relative z-10">Careers</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
              </NavLink>
            </div>

            {/* Desktop Login/Logout Links */}
            <div className="hidden sm:flex items-center space-x-3">
              {loggedInUser ? (
                <>
                  <NavLink 
                    to="/contact-details" 
                    className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300 relative group"
                  >
                    <FaBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
                  </NavLink>
                  <NavLink
                    to="/logout"
                    className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-slate-200 hover:text-white border border-slate-600 hover:border-blue-500 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="text-2xl sm:hidden text-slate-200 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
              onClick={toggleMenu}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <FaBars 
                  className={`absolute transition-all duration-300 ${
                    isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`} 
                />
                <FaTimes 
                  className={`absolute transition-all duration-300 ${
                    isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Side Navbar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 sm:hidden transform transition-transform duration-500 ease-in-out shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <NavLink
             to="/">
            <img
              src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
              alt="MOHORA TECH"
              className="h-auto w-32"
            />
            </NavLink>
            <button
              onClick={toggleMenu}
              className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <NavLink
              to="/"
              className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
              onClick={toggleMenu}
            >
              <span className="ml-3">Home</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </NavLink>
            
            {user?.role === "admin" && (
              <NavLink
                to="/admin-dashboard"
                className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-emerald-600/20 hover:to-teal-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
                onClick={toggleMenu}
              >
                <span className="ml-3">Admin Dashboard</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                </div>
              </NavLink>
            )}
            
            <NavLink
              to="/services"
              className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
              onClick={toggleMenu}
            >
              <span className="ml-3">Services</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </NavLink>
            
            <NavLink
              to="/contact"
              className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
              onClick={toggleMenu}
            >
              <span className="ml-3">Contact</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </NavLink>
            
            <NavLink
              to="/faqs"
              className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
              onClick={toggleMenu}
            >
              <span className="ml-3">FAQs</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </NavLink>
            
            <NavLink
              to="/careers"
              className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
              onClick={toggleMenu}
            >
              <span className="ml-3">Careers</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            </NavLink>
          </div>

          {/* Mobile Auth Section */}
          <div className="p-4 border-t border-slate-700/50 space-y-3">
            {loggedInUser ? (
              <>
                <NavLink
                  to="/contact-details"
                  className="flex items-center text-slate-200 hover:text-white hover:bg-slate-700/50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
                  onClick={toggleMenu}
                >
                  <FaBell className="text-lg mr-3" />
                  <span>Notifications</span>
                  <span className="ml-auto w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
                </NavLink>
                <NavLink
                  to="/logout"
                  className="flex items-center justify-center text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 w-full"
                  onClick={toggleMenu}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center justify-center text-slate-200 hover:text-white border border-slate-600 hover:border-blue-500 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 w-full"
                  onClick={toggleMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 w-full"
                  onClick={toggleMenu}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;













































// import React, { useState } from "react";
// import { FaBars, FaBell, FaTimes } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";

// const NavBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { loggedInUser, user } = useSelector((state) => state.auth);

//   const toggleMenu = () => {
//     setIsOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl backdrop-blur-lg border-b border-slate-700/50">
//         <div className="px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-20">
//             <div className="flex items-center">
//               <img
//                 src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
//                 alt="MOHORA TECH"
//                 className="h-auto w-40 drop-shadow-lg transition-transform duration-300 hover:scale-105"
//               />
//             </div>

//             {/* Desktop Navigation Links */}
//             <div className="hidden sm:flex items-center space-x-1">
//               <NavLink
//                 to="/"
//                 className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
//               >
//                 <span className="relative z-10">Home</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
//               </NavLink>
//               {user?.role === "admin" && (
//                 <NavLink
//                   to="/admin-dashboard"
//                   className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
//                 >
//                   <span className="relative z-10">Admin Dashboard</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 to-teal-600/0 group-hover:from-emerald-600/20 group-hover:to-teal-600/20 rounded-lg transition-all duration-300"></div>
//                 </NavLink>
//               )}
//               <NavLink
//                 to="/services"
//                 className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
//               >
//                 <span className="relative z-10">Services</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
//               </NavLink>
//               <NavLink
//                 to="/contact"
//                 className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
//               >
//                 <span className="relative z-10">Contact</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
//               </NavLink>
//               <NavLink
//                 to="/faqs"
//                 className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
//               >
//                 <span className="relative z-10">FAQs</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
//               </NavLink>
//               <NavLink
//                 to="/careers"
//                 className="text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative group"
//               >
//                 <span className="relative z-10">Careers</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
//               </NavLink>
//             </div>

//             {/* Desktop Login/Logout Links */}
//             <div className="hidden sm:flex items-center space-x-3">
//               {loggedInUser ? (
//                 <>
//                   <NavLink 
//                     to="/contact-details" 
//                     className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300 relative group"
//                   >
//                     <FaBell className="text-xl" />
//                     <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
//                   </NavLink>
//                   <NavLink
//                     to="/logout"
//                     className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//                   >
//                     Logout
//                   </NavLink>
//                 </>
//               ) : (
//                 <>
//                   <NavLink
//                     to="/login"
//                     className="text-slate-200 hover:text-white border border-slate-600 hover:border-blue-500 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
//                   >
//                     Login
//                   </NavLink>
//                   <NavLink
//                     to="/register"
//                     className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
//                   >
//                     Register
//                   </NavLink>
//                 </>
//               )}
//             </div>

//             {/* Mobile Menu Toggle Button */}
//             <button
//               className="text-2xl sm:hidden text-slate-200 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
//               onClick={toggleMenu}
//             >
//               <div className="relative w-6 h-6 flex items-center justify-center">
//                 <FaBars 
//                   className={`absolute transition-all duration-300 ${
//                     isOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
//                   }`} 
//                 />
//                 <FaTimes 
//                   className={`absolute transition-all duration-300 ${
//                     isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
//                   }`} 
//                 />
//               </div>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Overlay */}
//       <div 
//         className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden transition-opacity duration-300 ${
//           isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={toggleMenu}
//       />

//       {/* Mobile Side Navbar */}
//       <div className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-50 sm:hidden transform transition-transform duration-500 ease-in-out shadow-2xl ${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
//         <div className="flex flex-col h-full">
//           {/* Mobile Header */}
//           <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
//             <img
//               src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
//               alt="MOHORA TECH"
//               className="h-auto w-32"
//             />
//             <button
//               onClick={toggleMenu}
//               className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
//             >
//               <FaTimes className="text-xl" />
//             </button>
//           </div>

//           {/* Mobile Navigation Links */}
//           <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
//             <NavLink
//               to="/"
//               className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
//               onClick={toggleMenu}
//             >
//               <span className="ml-3">Home</span>
//               <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//               </div>
//             </NavLink>
            
//             {user?.role === "admin" && (
//               <NavLink
//                 to="/admin-dashboard"
//                 className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-emerald-600/20 hover:to-teal-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
//                 onClick={toggleMenu}
//               >
//                 <span className="ml-3">Admin Dashboard</span>
//                 <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
//                 </div>
//               </NavLink>
//             )}
            
//             <NavLink
//               to="/services"
//               className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
//               onClick={toggleMenu}
//             >
//               <span className="ml-3">Services</span>
//               <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//               </div>
//             </NavLink>
            
//             <NavLink
//               to="/contact"
//               className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
//               onClick={toggleMenu}
//             >
//               <span className="ml-3">Contact</span>
//               <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//               </div>
//             </NavLink>
            
//             <NavLink
//               to="/faqs"
//               className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
//               onClick={toggleMenu}
//             >
//               <span className="ml-3">FAQs</span>
//               <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//               </div>
//             </NavLink>
            
//             <NavLink
//               to="/careers"
//               className="flex items-center text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 group"
//               onClick={toggleMenu}
//             >
//               <span className="ml-3">Careers</span>
//               <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//               </div>
//             </NavLink>
//           </div>

//           {/* Mobile Auth Section */}
//           <div className="p-4 border-t border-slate-700/50 space-y-3">
//             {loggedInUser ? (
//               <>
//                 <NavLink
//                   to="/contact-details"
//                   className="flex items-center text-slate-200 hover:text-white hover:bg-slate-700/50 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300"
//                   onClick={toggleMenu}
//                 >
//                   <FaBell className="text-lg mr-3" />
//                   <span>Notifications</span>
//                   <span className="ml-auto w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
//                 </NavLink>
//                 <NavLink
//                   to="/logout"
//                   className="flex items-center justify-center text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 w-full"
//                   onClick={toggleMenu}
//                 >
//                   Logout
//                 </NavLink>
//               </>
//             ) : (
//               <>
//                 <NavLink
//                   to="/login"
//                   className="flex items-center justify-center text-slate-200 hover:text-white border border-slate-600 hover:border-blue-500 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 w-full"
//                   onClick={toggleMenu}
//                 >
//                   Login
//                 </NavLink>
//                 <NavLink
//                   to="/register"
//                   className="flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 w-full"
//                   onClick={toggleMenu}
//                 >
//                   Register
//                 </NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NavBar;