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
  }, []);

  const handleReply = async (e, contactId) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = editReplyId
        ? await updateReply(editReplyId, formData)
        : await createReply(contactId, formData);
      if (response.success) {
        setFormData({ reply: "" });
        console.log(response)
        setEditReplyId(null);
        setSelectedContactId(null);
        dispatch(setSuccess(response.message));
        getAdminContacts();
      } else {
        console.log(response.message)
        dispatch(setError(response.message));
      }
    } catch (error) {
      console.log(error)
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
    setSelectedContactId(contactId); // Set the selectedContactId to the contact ID
  };

  const handleCancelUpdate = () => {
    setEditReplyId(null);
    setFormData({ reply: "" });
    setSelectedContactId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <ul className="space-y-6">
        {adminContacts.map((contact) => (
          <li
            key={contact._id}
            className="bg-gray-100 rounded-lg shadow-md p-6 border border-gray-300"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {contact.email}
            </h2>
            <p className="text-gray-600 mt-2">{contact.message}</p>
            <div className="mt-4 space-y-2">
              {contact.replies?.map((reply) => (
                <div
                  key={reply._id}
                  className="bg-gray-200 p-2 rounded-lg text-gray-700"
                >
                  <p>{reply.reply}</p>
                  <small className="text-xs text-gray-500">
                    {new Date(reply.date).toLocaleString("en-GB")}
                  </small>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() =>
                        handleEditReply(reply._id, reply.reply, contact._id)
                      }
                      className="text-blue-500 hover:text-blue-600 underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReply(reply._id)}
                      className="text-red-500 hover:text-red-600 underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="mt-4 text-blue-500 hover:text-blue-600 underline"
              onClick={() =>
                setSelectedContactId(
                  selectedContactId === contact._id ? null : contact._id
                )
              }
            >
              {selectedContactId === contact._id ? "Cancel Reply" : "Reply"}
            </button>

            {selectedContactId === contact._id && (
              <form
                onSubmit={(e) => handleReply(e, contact._id)}
                className="mt-4"
              >
                <label
                  htmlFor={`reply-${contact._id}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Reply
                </label>
                <input
                  type="text"
                  id={`reply-${contact._id}`}
                  name="reply"
                  value={formData.reply}
                  onChange={(e) => setFormData({ reply: e.target.value })}
                  className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your reply..."
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                  >
                    {editReplyId ? "Update Reply" : "Submit"}
                  </button>
                  {editReplyId && (
                    <button
                      type="button"
                      onClick={handleCancelUpdate}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
                    >
                      Cancel Update
                    </button>
                  )}
                </div>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminContacts;
