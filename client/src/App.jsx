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
import NotFound from "./layouts/NotFound";
import Users from "./components/admin/Users";
import AdminFaq from "./components/admin/AdminFaq";
import ServiceForm from "./components/admin/ServiceForm";
import AdminContacts from "./components/admin/AdminContacts";
import InvoiceGenerator from "./components/admin/InvoiceGenerator InvoiceGenerator";
import About from "./components/About-us/AboutUs";
import Products from "./components/Our-Product/OurProduct";
import TermsAndConditions from "./components/About-us/TermAndCondition";
import PrivacyPolicy from "./components/About-us/PrivacyPolicy";
import RefundPolicy from "./components/About-us/RefundPolicy";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLoggedInUser = () => async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        console.log("Tokens not found. Skipping user fetch.");
        return;
      }

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
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/services" element={<Service />}></Route>
              <Route path="/contact" element={<ContactFormPage />}></Route>
              <Route path="/faqs" element={<FaqPage />}></Route>
              <Route path="/contact-details" element={<ContactDetail />}></Route>
              <Route path="/careers" element={<Career />}></Route>
              <Route path="/our-product" element={<Products />}></Route>
              <Route path="/terms-and-conditions" element={<TermsAndConditions />}></Route>
              <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
              <Route path="/refund-policy" element={<RefundPolicy />}></Route>
              <Route path="/about" element={<About />}></Route>

              {/* Nested Admin Routes */}
              <Route path="/admin-dashboard" element={<AdminDashboard />}>
                <Route index element={<ServiceForm />} />
                <Route path="users" element={<Users />} />
                <Route path="faqs" element={<AdminFaq />} />
                <Route path="contacts" element={<AdminContacts />} />
                <Route path="invoice" element={<InvoiceGenerator />} />
              </Route>

              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;