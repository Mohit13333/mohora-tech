import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUsers, FiHelpCircle, FiSettings, FiMail, FiMenu, FiX, FiHome } from 'react-icons/fi';
import { FaFileInvoice } from 'react-icons/fa';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '', name: 'Dashboard', icon: <FiHome /> }, // Added dashboard item
    { path: 'users', name: 'Users', icon: <FiUsers /> },
    { path: 'faqs', name: 'FAQs', icon: <FiHelpCircle /> },
    // { path: 'services', name: 'Services', icon: <FiSettings /> },
    { path: 'contacts', name: 'Contacts', icon: <FiMail /> },
    { path: 'invoice', name: 'invoice', icon: <FaFileInvoice /> },
  ];

  // Check if current path matches any nav item
  const isActive = (path) => {
    const currentPath = location.pathname.replace('/admin-dashboard', '').replace(/^\//, '');
    return currentPath === path;
  };

  // If at /admin-dashboard with no subroute, redirect to dashboard
  React.useEffect(() => {
    if (location.pathname === '/admin-dashboard') {
      navigate('/admin-dashboard/', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transform fixed md:relative inset-y-0 left-0 
        w-64 bg-gradient-to-b from-slate-900 to-slate-800 shadow-lg
        transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex items-center justify-center h-16 px-8 border-b border-slate-700">
          <h1 className="text-white text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
        <nav className="px-8 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path || 'dashboard'}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-8 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return <AdminSidebar />;
};

export default AdminDashboard;