import { model, Schema } from "mongoose";

const contactSchema = new Schema(
  {
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Contact = new model("Contact", contactSchema);

export default Contact;
