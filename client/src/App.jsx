import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import Career from "./pages/Career";
import NavBar from "./layouts/NavBar";
import SignupPage from "./pages/Signup";
import Logout from "./components/auth/Logout";
import Footer from "./layouts/Footer";
import Service from "./pages/Service";
import ContactFormPage from "./pages/ContactFormPage";
import ContactDetail from "./components/contacts/ContactDetail";
import FaqPage from "./pages/FaqPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./components/auth/slice/authSlice";
import { getUser } from "./components/auth/api/authApi";
import { setError } from "./components/global/globalSlice/GlobalSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLoggedInUser = () => async () => {
      try {
        const response = await getUser();
        dispatch(setUser(response.user));
      } catch (error) {
        setError(error.message);
      }
    };
    dispatch(fetchLoggedInUser());
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<SignupPage />}></Route>
              <Route path="/logout" element={<Logout />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/services" element={<Service />}></Route>
              <Route path="/contact" element={<ContactFormPage />}></Route>
              <Route path="/faqs" element={<FaqPage />}></Route>
              <Route
                path="/contact-details"
                element={<ContactDetail />}
              ></Route>
              <Route
                path="/admin-dashboard"
                element={<AdminDashboard />}
              ></Route>
              <Route path="/careers" element={<Career />}></Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
