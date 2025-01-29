import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./api/authApi";
import { setError, setSuccess } from "../global/globalSlice/GlobalSlice";
import { clearUser } from "./slice/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await logout();
        console.log("Logout response:", response);
        if (response.success) {
          dispatch(setSuccess(response.message))
          dispatch(clearUser());
          navigate("/login");
        } else {
          dispatch(setError(response));
        }
      } catch (error) {
        // console.error("Logout error:", error.message);
        dispatch(setError(error.message));
      }
    };

    handleLogout();
  }, [dispatch, navigate]);

  return null;
};

export default Logout;
