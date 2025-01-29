import React, { useEffect } from "react";
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

  const getAllUser = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getAllUsers();
      // console.log(response);
      if (response.success) {
        dispatch(setAdminUsers(response.users));
      }
    } catch (error) {
      // console.log(error);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const deleteUsers = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await deleteUser(id);
      // console.log(response);
      if (response.success) {
        dispatch(setSuccess(response.message));
        getAllUser();
      }
    } catch (error) {
      // console.log(error.message);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Users</h1>
      {adminUsers.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="bg-white shadow rounded-lg p-4">
          <ul className="space-y-4">
            {adminUsers.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => deleteUsers(user._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Users;
