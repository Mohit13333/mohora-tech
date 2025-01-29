import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFaqs } from "./Api/faqApi";
import { setError, setfaqs } from "./slice/faqSlice";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const Faq = () => {
  const { faqs } = useSelector((state) => state.faqs);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(null);

  const getAllFaq = async () => {
    try {
      const response = await getAllFaqs();
      dispatch(setfaqs(response.Faqs));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    getAllFaq();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={faq._id}
            className="border border-gray-300 rounded-md shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition duration-200 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="font-medium">{faq.title}</span>
              <span className="text-gray-500">
                {activeIndex === index ? <FiChevronDown /> : <FiChevronRight />}
              </span>
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-white">
                <p className="text-gray-600">{faq.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
