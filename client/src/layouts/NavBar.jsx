import React, { useState } from "react";
import { FaBars, FaBell, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedInUser, user } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 shadow-md rounded-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/mohitsingh8954/image/upload/v1738087360/Figma_basics_1_dnzwnz.svg"
              alt="Infrabyte Logo"
              className="h-auto w-40"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex items-center space-x-4">
            <NavLink
              to="/"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </NavLink>
            {user?.role === "admin" && (
              <NavLink
                to="/admin-dashboard"
                className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Admin Dashboard
              </NavLink>
            )}
            <NavLink
              to="/services"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </NavLink>
            <NavLink
              to="/faqs"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              FAQs
            </NavLink>
            <NavLink
              to="/careers"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Careers
            </NavLink>
          </div>

          {/* Desktop Login/Logout Links */}
          <div className="hidden sm:flex space-x-4">
            {loggedInUser ? (
              <>
                <div className="hidden sm:flex items-center space-x-4">
                  <NavLink to="/contact-details" className="text-white">
                    <FaBell className="text-xl" />
                  </NavLink>
                </div>
                <NavLink
                  to="/logout"
                  className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="text-2xl sm:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Side Navbar */}
      {isOpen && (
        <div className="sm:hidden bg-blue-500">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Home
            </NavLink>
            {user?.role === "admin" && (
              <NavLink
                to="/admin-dashboard"
                className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                Admin Dashboard
              </NavLink>
            )}
            <NavLink
              to="/services"
              className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
            <NavLink
              to="/faqs"
              className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              FAQs
            </NavLink>
            <NavLink
              to="/careers"
              className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Careers
            </NavLink>
            {loggedInUser ? (
              <>
                <NavLink
                  to="/logout"
                  className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Logout
                </NavLink>
                <NavLink
                  to="/contact-details"
                  className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  <FaBell className="inline text-lg mr-2" /> Notifications
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block text-white hover:bg-blue-400 px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
