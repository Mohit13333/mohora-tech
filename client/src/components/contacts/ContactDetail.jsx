import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactById, getContactByUserId } from "./Api/contactApi";
import { setContacts } from "./slice/contactSlice";
import { setError, setLoading, setSuccess } from "../global/globalSlice/GlobalSlice";

const ContactDetail = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contacts);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [visibleItems, setVisibleItems] = useState({});

  const getContacts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getContactByUserId();
      if (response.success) {
        dispatch(setContacts(response.contacts));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getContacts();

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

  const handleContactClick = (contactId) => {
    setSelectedContactId((prevId) => (prevId === contactId ? null : contactId));
  };

  const handleDeleteContact = async (id) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteContactById(id);
      if (response.success) {
        dispatch(setSuccess(response.message));
        const data = await getContactByUserId();
        dispatch(setContacts(data.contacts));
      } else {
        dispatch(setError(response));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div 
          className="mb-12"
          data-animate
          id="contact-header"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-white mb-2 transition-all duration-700 ease-in-out ${visibleItems['contact-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            Contact <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Messages</span>
          </h2>
          <p className={`text-lg text-slate-300 transition-all duration-700 ease-in-out delay-100 ${visibleItems['contact-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            View and manage your contact messages and replies
          </p>
        </div>

        <ul className="space-y-6">
          {contacts?.map((contact, index) => (
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
                <div className={`flex justify-between items-center p-6 transition-all duration-300 ${
                  selectedContactId === contact._id 
                    ? 'bg-white/10' 
                    : 'hover:bg-white/10'
                }`}
                >
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-white">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">You: </span>
                      {contact.message}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      {new Date(contact.createdAt).toLocaleString("en-GB")}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDeleteContact(contact._id)}
                      className="group relative px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <span className="relative z-10">Delete</span>
                    </button>
                    <button
                      onClick={() => handleContactClick(contact._id)}
                      className="group relative px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <span className="relative z-10">
                        {selectedContactId === contact._id ? "Hide Replies" : "Show Replies"}
                      </span>
                    </button>
                  </div>
                </div>

                {selectedContactId === contact._id &&
                  contact?.replies &&
                  contact?.replies?.length > 0 && (
                    <div className="border-t border-white/10">
                      <ul className="p-4 space-y-3">
                        {contact.replies.map((reply, replyIndex) => (
                          <li
                            key={reply._id}
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                          >
                            <div className="flex justify-between">
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
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </li>
          ))}
        </ul>
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

export default ContactDetail;