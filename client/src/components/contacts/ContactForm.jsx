import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "./Api/contactApi";
import {
  setError,
  setLoading,
  setSuccess,
} from "../global/globalSlice/GlobalSlice";

const ContactForm = () => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await createContact(formData);
      console.log(response);
      if (response.success) {
        dispatch(setSuccess(response.message));
        setFormData({ phoneNumber: "", email: "", message: "" });
      } else {
        dispatch(setError(response.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-md mx-auto p-4 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
          {loggedInUser ? (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  required
                  placeholder="Enter Your Phone Number"
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  id="email"
                  placeholder="Enter Your Email"
                  required
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                  placeholder="Enter your message here"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li>
                  Contact Email:
                  <a
                    href="mailto:mohoratechnologiespvtltd@gmail.com"
                    className="text-blue-400 hover:underline"
                  >
                    mohoratechnologiespvtltd@gmail.com
                  </a>
                </li>
                <li>
                  Phone:
                  <a
                    href="tel:+919065269192"
                    className="text-blue-400 hover:underline"
                  >
                    +91 9065269192
                  </a>
                </li>
                <li>Mon to Fri (09:00 am – 09:00 pm)</li>
                <li>
                  Support Team:
                  <a
                    href="mailto:mohoratechnologiespvtltd@gmail.com"
                    className="text-blue-400 hover:underline"
                  >
                    mohoratechnologiespvtltd@gmail.com
                  </a>
                </li>
                <li>
                  Sales Team:
                  <a
                    href="mailto:mohoratechnologiespvtltd@gmail.com"
                    className="text-blue-400 hover:underline"
                  >
                    mohoratechnologiespvtltd@gmail.com
                  </a>
                </li>
                <li>
                  Business Inquiries:
                  <a
                    href="mailto:mohoratechnologiespvtltd@gmail.com"
                    className="text-blue-400 hover:underline"
                  >
                    mohoratechnologiespvtltd@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <section className="mx-auto max-w-screen-xl">
          <div className="my-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3570.3986938159082!2d84.7439328!3d26.507298999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993259476acb7b5%3A0xc1885ab1c4a9623d!2sMohit%20Singh%20House&#39;s!5e0!3m2!1sen!2sin!4v1731336654143!5m2!1sen!2sin"
              width="100%"
              height="300"
              allowFullScreen
              className="my-5 rounded-lg"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactForm;
