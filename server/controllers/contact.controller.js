import Contact from "../models/contact.model.js";
import ContactReply from "../models/contactReply.model.js";

export const createContact = async (req, res) => {
  try {
    const { email, phoneNumber, message } = req.body;
    if (!email || !phoneNumber || !message) {
      return res
        .status(400)
        .json({ message: "Email, phone number, and message are required." });
    }
    await Contact.create({
      email,
      phoneNumber,
      message,
      user: req.user.id,
    });
    return res.status(201).json({
      message:
        "Thank You for contacting us.You will get revert back in 24 Hours.",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to contact.please contact by mention details",
      error: true,
      success: false,
    });
  }
};

export const getContactsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const contacts = await Contact.find({ user: userId }).populate({
      path: "replies", 
      populate: {
        path: "admin", 
        select: "name", 
      },
    });
    if (contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found." });
    }
    return res.status(200).json({
      message: "Contacts fetched successfully.",
      contacts,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch contacts.",
      error: true,
      success: false,
    });
  }
};

export const deleteContactsByUserid = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const contact = await Contact.findOne({ _id: id, user: userId });
    if (!contact) {
      return res.status(404).json({
        message: "Contact not found or unauthorized access.",
        error: true,
        success: false,
      });
    }
    await Contact.deleteOne({ _id: id, user: userId });
    await ContactReply.deleteMany({ contact: id });
    return res
      .status(200)
      .json({ message: "Contact deleted.", error: false, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete", error: true, success: false });
  }
};

export const getAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find().populate("replies");
    return res.status(200).json({ contacts, error: false, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No Contacts Found", error: true, success: false });
  }
};
