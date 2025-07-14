import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronRight, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  getAllFaqs,
  deleteFaqById,
  createFaq,
  updateFaqById,
} from "../faqs/Api/faqApi";
import { setfaqs } from "../faqs/slice/faqSlice";
import { setError, setLoading, setSuccess } from "../global/globalSlice/GlobalSlice";

const AdminFaq = () => {
  const { faqs } = useSelector((state) => state.faqs);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getAllFaq = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllFaqs();
      dispatch(setfaqs(response.Faqs));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createFaqs = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await createFaq(formData);
      if (response.success) {
        getAllFaq();
        dispatch(setSuccess(response.message));
        setFormData({ title: "", description: "" });
      } else {
        dispatch(setError(response));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const deleteFaq = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await deleteFaqById(id);
      if (response.success) {
        getAllFaq();
        dispatch(setSuccess(response.message));
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateFaq = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await updateFaqById(id, formData);
      if (response.success) {
        setEditIndex(null);
        setFormData({ title: "", description: "" });
        getAllFaq();
        dispatch(setSuccess(response.message));
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = faqs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(faqs.length / itemsPerPage);

  useEffect(() => {
    getAllFaq();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-gentle"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 py-8">
        {/* Create/Update FAQ Form */}
        <div className="lg:w-1/3">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg h-fit">
            <h2 className="text-xl font-bold text-white mb-4">
              {editIndex ? "Update FAQ" : "Create FAQ"}
            </h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              required
              onChange={handleChange}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-8 py-3 text-slate-200 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Title"
            />
            <textarea
              name="description"
              value={formData.description}
              required
              onChange={handleChange}
              className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-8 py-3 text-slate-200 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="Description"
              rows="5"
            ></textarea>
            <div className="flex space-x-3">
              {editIndex ? (
                <>
                  <button
                    className="group relative px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                    onClick={() => updateFaq(editIndex)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10">Update FAQ</span>
                  </button>
                  <button
                    className="group relative px-8 py-2 bg-gradient-to-r from-slate-600/50 to-slate-700/50 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                    onClick={() => {
                      setEditIndex(null);
                      setFormData({ title: "", description: "" });
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10">Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  className="group relative px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden"
                  onClick={() => createFaqs(formData)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <span className="relative z-10">Create FAQ</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="lg:w-2/3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Questions</span>
          </h1>
          
          {faqs.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-8 text-center">
              <p className="text-slate-300">No FAQs found.</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {currentItems.map((faq) => (
                  <div
                    key={faq._id}
                    className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden transition-all duration-300 ${
                      activeIndex === faq._id ? 'shadow-lg scale-[1.01]' : 'shadow-md hover:scale-[1.005]'
                    }`}
                  >
                    <button
                      className="w-full flex justify-between items-center p-6 transition-all duration-300 hover:bg-white/10"
                      onClick={() =>
                        setActiveIndex(activeIndex === faq._id ? null : faq._id)
                      }
                    >
                      <span className="font-medium text-white text-left">{faq.title}</span>
                      <span className="text-slate-400 transition-transform duration-300">
                        {activeIndex === faq._id ? <FiChevronDown className="transform rotate-180" /> : <FiChevronRight />}
                      </span>
                    </button>
                    {activeIndex === faq._id && (
                      <div className="p-6 bg-white/5 border-t border-white/10">
                        <p className="text-slate-300 mb-4">{faq.description}</p>
                        <div className="flex space-x-3">
                          <button
                            className="group relative px-8 py-2 bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            onClick={() => {
                              setEditIndex(faq._id);
                              setFormData({
                                title: faq.title,
                                description: faq.description,
                              });
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center">
                              <FiEdit2 className="mr-2" /> Edit
                            </span>
                          </button>
                          <button
                            className="group relative px-8 py-2 bg-gradient-to-r from-red-600/50 to-pink-600/50 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            onClick={() => deleteFaq(faq._id)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center">
                              <FiTrash2 className="mr-2" /> Delete
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {faqs.length > itemsPerPage && (
                <div className="flex justify-center mt-8">
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
      </div>
    </div>
  );
};

export default AdminFaq;