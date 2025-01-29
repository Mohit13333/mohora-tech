import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/auth/slice/authSlice";
import globalReducer from "../components/global/globalSlice/GlobalSlice"
import serviceReducer from "../components/services/slice/serviceSlice";
import adminUsersReducer from "../components/admin/slice/adminSlice";
import contactsReducer from "../components/contacts/slice/contactSlice";
import faqsReducer from "../components/faqs/slice/faqSlice";
import replyReducer from "../components/admin/slice/replies.slice"
import adminContactsReducer from "../components/admin/slice/adminContacsSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    global:globalReducer,
    services: serviceReducer,
    adminUsers: adminUsersReducer,
    contacts: contactsReducer,
    faqs: faqsReducer,
    replies:replyReducer,
    adminContacts:adminContactsReducer,
  },
});

export default store;
