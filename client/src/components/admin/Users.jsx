import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminUsers } from "./slice/adminSlice";
import { deleteUser, getAllUsers } from "./api/adminApi";
import {
  setError,
  setLoading,
  setSuccess,
} from "../global/globalSlice/GlobalSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { adminUsers } = useSelector((state) => state.adminUsers);
  const [visibleItems, setVisibleItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Items per page

  const getAllUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllUsers();
      if (response.success) {
        dispatch(setAdminUsers(response.users));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllUser();

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('[data-animate]');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adminUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(adminUsers.length / itemsPerPage);

  const deleteUsers = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await deleteUser(id);
      if (response.success) {
        dispatch(setSuccess(response.message));
        getAllUser();
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      </div>

      {/* Main Content */}
      <div className="relative w-full mx-auto py-8">
        <div 
          className="mb-8 px-8"
          data-animate
          id="users-header"
        >
          <h1 className={`text-3xl sm:text-4xl font-bold text-white mb-2 transition-all duration-700 ease-in-out ${visibleItems['users-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Admin <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Users</span>
          </h1>
          <p className={`text-lg text-slate-300 transition-all duration-700 ease-in-out delay-100 ${visibleItems['users-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Manage all registered users
          </p>
        </div>

        {adminUsers.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8 text-center">
            <p className="text-slate-300">No users found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-8">
              {currentItems.map((user, index) => (
                <div
                  key={user._id}
                  data-animate
                  id={`user-${index}`}
                  className={`transition-all duration-700 ease-in-out delay-${(index % 4) * 100} ${
                    visibleItems[`user-${index}`] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                      <p className="text-sm text-slate-300 mt-1">{user.email}</p>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => deleteUsers(user._id)}
                        className="group relative px-8 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden w-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <span className="relative z-10">Delete User</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {adminUsers.length > itemsPerPage && (
              <div className="flex justify-center mt-8 px-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-8 py-2 bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white rounded-lg disabled:opacity-50 transition-all duration-300 hover:scale-105"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-8 py-2 bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white rounded-lg disabled:opacity-50 transition-all duration-300 hover:scale-105"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
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

export default Users;