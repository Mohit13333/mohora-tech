import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactById, getContactByUserId } from "./Api/contactApi";
import { setContacts } from "./slice/contactSlice";
import {
  setError,
  setLoading,
  setSuccess,
} from "../global/globalSlice/GlobalSlice";

const ContactDetail = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contacts);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const getContacts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getContactByUserId();
      // console.log(response);
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
  }, []);

  const handleContactClick = (contactId) => {
    setSelectedContactId((prevId) => (prevId === contactId ? null : contactId));
  };

  const handleDeleteContact = async (id) => {
    dispatch(setLoading(true));
    try {
      const response = await deleteContactById(id);
      console.log(response);
      if (response.success) {
        dispatch(setSuccess(response.message));
        const data=await getContactByUserId();
        dispatch(setContacts(data.contacts))
      } else {
        dispatch(setError(response));
      }
    } catch (error) {
      // console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
console.log(contacts)
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
      <ul className="space-y-4">
        {contacts?.map((contact) => (
          <li
            key={contact._id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex justify-between items-center">
              <p
                className="text-lg font-semibold"
                onClick={() => handleContactClick(contact._id)}
              >
                You :- {contact.message}
              </p>
              <div>
                <button
                  onClick={() => handleDeleteContact(contact._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleContactClick(contact._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-200"
                >
                  {selectedContactId === contact._id
                    ? "Hide Replies"
                    : "Show Replies"}
                </button>
              </div>
            </div>
            {selectedContactId === contact._id &&
              contact?.replies &&
              contact?.replies?.length > 0 && (
                <ul className="mt-2 pl-4">
                  {contact.replies.map((reply) => (
                    <li
                      key={reply._id}
                      className="text-gray-700 bg-gray-100 rounded p-2 mb-1 flex justify-between"
                    >
                      <p>{reply.reply}</p>
                      <div className="flex flex-col items-end">
                        <p className="text-sm text-gray-500">
                          {new Date(reply.date).toLocaleString("en-GB")}
                        </p>
                        <p className="text-sm text-gray-500">
                          Admin :- {reply?.admin?.name}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactDetail;
