import Faq from "../models/faq.model.js";

export const createFaq = async (req, res) => {
  try {
    const { title, description } = req.body;
    const existingFAQ = await Faq.findOne({
      $or: [({ title }, { description })],
    });
    if (existingFAQ) {
      return res.status(400).json({ message: "FAQ already exist!", error: true, success: false });
    }
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description are required.", error: true, success: false });
    }
    await Faq.create({
      title,
      description,
    });
    return res
      .status(200)
      .json({ message: "FAQ created", error: false, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create FAQ", error: true, success: false });
  }
};

export const getAllFaq = async (req, res) => {
  try {
    const Faqs = await Faq.find();
    return res.status(200).json({ Faqs, error: false, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch FAQ", error: true, success: false });
  }
};

export const updateFaqById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!id) {
      return res.status(404).json({ message: "Faq id is required", error: true, success: false });
    }
    await Faq.updateOne({ _id: id }, { $set: data });
    return res.status(200).json({
      message: "Faq Updated SuccessFully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update FAQ", error: true, success: false });
  }
};

export const deleteFaqById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ message: "Faq id is required", error: true, success: false });
    }
    await Faq.deleteOne({ _id: id });
    return res.status(200).json({
      message: "Faq Deleted SuccesFully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete FAQ", error: true, success: false });
  }
};
