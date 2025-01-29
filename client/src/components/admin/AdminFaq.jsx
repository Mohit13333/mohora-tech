import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import {
  getAllFaqs,
  deleteFaqById,
  createFaq,
  updateFaqById,
} from "../faqs/Api/faqApi";
import {
  setfaqs,
} from "../faqs/slice/faqSlice";
import { setError, setLoading, setSuccess } from "../global/globalSlice/GlobalSlice";

const AdminFaq = () => {
  const { faqs } = useSelector((state) => state.faqs);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

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
        // console.log(response)
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

  useEffect(() => {
    getAllFaq();
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row p-4 md:p-6">
      <div className="max-w-md mx-auto h-fit p-4 rounded-lg shadow-md md:w-1/4 mb-4 md:mr-4">
        <h2 className="text-xl font-bold mb-4">
          {editIndex ? "Update FAQ" : "Create FAQ"}
        </h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          required
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
          placeholder="Title"
        />
        <textarea
          name="description"
          value={formData.description}
          required
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-2"
          placeholder="Description"
          rows="3"
        ></textarea>
        <div className="flex space-x-2">
          {editIndex ? (
            <>
              <button
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
                onClick={() => updateFaq(editIndex)}
              >
                Update
              </button>
              <button
                className="bg-gray-300 text-gray-700 rounded-md p-2 hover:bg-gray-400"
                onClick={() => {
                  setEditIndex(null);
                  setFormData({ title: "", description: "" });
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
              onClick={() => createFaqs(formData)}
            >
              Create
            </button>
          )}
        </div>
      </div>
      <div className="w-full md:w-3/4 p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="border border-gray-300 rounded-md shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition duration-200 focus:outline-none"
                onClick={() =>
                  setActiveIndex(activeIndex === faq._id ? null : faq._id)
                }
              >
                <span className="font-medium">{faq.title}</span>
                <span className="text-gray-500">
                  {activeIndex === faq._id ? <FiChevronDown /> : <FiChevronRight />}
                </span>
              </button>
              {activeIndex === faq._id && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600">{faq.description}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => {
                        setEditIndex(faq._id);
                        setFormData({
                          title: faq.title,
                          description: faq.description,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteFaq(faq._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminFaq;
