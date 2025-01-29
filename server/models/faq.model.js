import { model, Schema } from "mongoose";

const faqSchema = new Schema(
  {
    title: { type: String, required: true, uniue: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Faq = new model("Faq", faqSchema);

export default Faq;
