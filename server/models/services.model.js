import { model, Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    avatar: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, reuired: true },
  },
  {
    timestamps: true,
  }
);

const Service = new model("Service", serviceSchema);

export default Service;
