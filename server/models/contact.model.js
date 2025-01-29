import { model, Schema } from "mongoose";

const contactSchema = new Schema(
  {
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: "ContactReply" }],
  },
  { timestamps: true }
);

const Contact = new model("Contact", contactSchema);

export default Contact;
