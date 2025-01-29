import { model, Schema } from "mongoose";

const contactReplySchema = new Schema({
  reply: { type: String, required: true },
  date: { type: Date, default: Date.now },
  contact: { type: Schema.Types.ObjectId, ref: "Contact", required: true },
  admin:{ type: Schema.Types.ObjectId, ref: "User", required: true },
});

const ContactReply = new model("ContactReply", contactReplySchema);
export default ContactReply;
