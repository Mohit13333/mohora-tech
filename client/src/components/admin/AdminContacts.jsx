import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReply,
  deleteReply,
  getAllContacts,
  updateReply,
} from "./api/adminApi";
import { setAdminContacts } from "./slice/adminContacsSlice";
import {
  setError,
  setLoading,
  setSuccess,
} from "../global/globalSlice/GlobalSlice";

const AdminContacts = () => {
  const dispatch = useDispatch();
  const { adminContacts } = useSelector((state) => state.adminContacts);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [editReplyId, setEditReplyId] = useState(null);
  const [formData, setFormData] = useState({ reply: "" });
  const [visibleItems, setVisibleItems] = useState({});
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  const getAdminContacts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getAllContacts();
      if (response.success) {
        dispatch(setAdminContacts(response.contacts));
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAdminContacts();

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
  const currentItems = adminContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(adminContacts.length / itemsPerPage);

  const handleReply = async (e, contactId) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = editReplyId
        ? await updateReply(editReplyId, formData)
        : await createReply(contactId, formData);
      if (response.success) {
        setFormData({ reply: "" });
        setEditReplyId(null);
        setSelectedContactId(null);
        dispatch(setSuccess(response.message));
        getAdminContacts();
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteReply = async (replyId) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteReply(replyId);
      if (response.success) {
        dispatch(setSuccess(response.message));
        getAdminContacts();
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEditReply = (replyId, replyText, contactId) => {
    setEditReplyId(replyId);
    setFormData({ reply: replyText });
    setSelectedContactId(contactId);
  };

  const handleCancelUpdate = () => {
    setEditReplyId(null);
    setFormData({ reply: "" });
    setSelectedContactId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      </div>

      {/* Main Content - Full Width */}
      <div className="relative w-full mx-auto py-8">
        <div 
          className="mb-8 px-4"
          data-animate
          id="admin-header"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-white mb-2 transition-all duration-700 ease-in-out ${visibleItems['admin-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Admin <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Contact Management</span>
          </h2>
          <p className={`text-lg text-slate-300 transition-all duration-700 ease-in-out delay-100 ${visibleItems['admin-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            View and manage all contact messages and replies
          </p>
        </div>

        <ul className="space-y-6 px-4">
          {currentItems.map((contact, index) => (
            <li
              key={contact._id}
              data-animate
              id={`contact-${index}`}
              className={`transition-all duration-700 ease-in-out delay-${(index % 3) * 100} ${
                visibleItems[`contact-${index}`] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden transition-all duration-300 ${
                selectedContactId === contact._id 
                  ? 'shadow-lg scale-[1.01]' 
                  : 'shadow-md hover:scale-[1.005]'
              }`}
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-white">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">From: </span>
                        {contact.email}
                      </h2>
                      <p className="text-slate-300 mt-2">{contact.message}</p>
                      <p className="text-sm text-slate-400 mt-2">
                        {new Date(contact.createdAt).toLocaleString("en-GB")}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedContactId(
                          selectedContactId === contact._id ? null : contact._id
                        )
                      }
                      className="group relative px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden w-full md:w-auto"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <span className="relative z-10">
                        {selectedContactId === contact._id ? "Cancel" : "Reply"}
                      </span>
                    </button>
                  </div>

                  {contact.replies?.length > 0 && (
                    <div className="mt-6 space-y-3">
                      {contact.replies.map((reply) => (
                        <div
                          key={reply._id}
                          className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                        >
                          <div className="flex flex-col md:flex-row md:justify-between gap-2">
                            <p className="text-slate-200">{reply.reply}</p>
                            <div className="text-right">
                              <p className="text-sm text-slate-400">
                                {new Date(reply.date).toLocaleString("en-GB")}
                              </p>
                              <p className="text-sm bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                Admin: {reply?.admin?.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-3 mt-3">
                            <button
                              onClick={() =>
                                handleEditReply(reply._id, reply.reply, contact._id)
                              }
                              className="group relative px-3 py-1 bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white font-medium rounded-md transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                              <span className="relative z-10">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteReply(reply._id)}
                              className="group relative px-3 py-1 bg-gradient-to-r from-red-600/50 to-pink-600/50 text-white font-medium rounded-md transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                              <span className="relative z-10">Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedContactId === contact._id && (
                    <form
                      onSubmit={(e) => handleReply(e, contact._id)}
                      className="mt-6"
                    >
                      <label
                        htmlFor={`reply-${contact._id}`}
                        className="block text-sm font-medium text-slate-300 mb-2"
                      >
                        Your Reply
                      </label>
                      <input
                        type="text"
                        id={`reply-${contact._id}`}
                        name="reply"
                        value={formData.reply}
                        onChange={(e) => setFormData({ reply: e.target.value })}
                        className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Write your reply..."
                        required
                      />
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4">
                        <button
                          type="submit"
                          className="group relative px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                          <span className="relative z-10">
                            {editReplyId ? "Update Reply" : "Submit"}
                          </span>
                        </button>
                        {editReplyId && (
                          <button
                            type="button"
                            onClick={handleCancelUpdate}
                            className="group relative px-6 py-2 bg-gradient-to-r from-slate-600/50 to-slate-700/50 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            <span className="relative z-10">Cancel</span>
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        {adminContacts.length > itemsPerPage && (
          <div className="flex justify-center mt-8 px-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white rounded-lg disabled:opacity-50 transition-all duration-300 hover:scale-105"
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
                className="px-4 py-2 bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white rounded-lg disabled:opacity-50 transition-all duration-300 hover:scale-105"
              >
                Next
              </button>
            </div>
          </div>
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

export default AdminContacts;