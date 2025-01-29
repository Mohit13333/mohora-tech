import Contact from "../models/contact.model.js";
import ContactReply from "../models/contactReply.model.js";

export const replyToContact = async (req, res) => {
  try {
    const id = req.params.id;
    const { reply } = req.body;
    const adminId = req.user.id;

    if (!reply) {
      return res.status(400).json({
        message: "Reply message is required.",
        error: true,
        success: false,
      });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found.",
        error: true,
        success: false,
      });
    }
    const newReply = await ContactReply.create({
      reply,
      contact: id,
      admin: adminId,
    });
    contact.replies.push(newReply._id);
    await contact.save();

    return res.status(200).json({
      message: "Message sent successfully.",
      data: newReply,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Please try again. Message not sent.",
      mes:error.message,
      error: true,
      success: false,
    });
  }
};

export const getAllReply = async (req, res) => {
  try {
    const getReplies = await ContactReply.find().populate("contact").populate("admin");
    return res.status(200).json({ getReplies });
  } catch (error) {
    return res.status(500).json({
      message: "An unexpected error occurred while fetching data",
      error: true,
      success: false,
    });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "ID is required",
        error: true,
        success: false,
      });
    }
    const reply = await ContactReply.findByIdAndDelete(id);
    if (!reply) {
      return res.status(404).json({
        message: "Reply not found",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Reply deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete reply",
      error: true,
      success: false,
    });
  }
};

export const updateReply = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (!id) {
      return res.status(400).json({
        message: "ID is required",
        error: true,
        success: false,
      });
    }
    const updatedReply = await ContactReply.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedReply) {
      return res.status(404).json({
        message: "Reply not found",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "Reply updated successfully",
      data: updatedReply,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update reply",
      error: true,
      success: false,
    });
  }
};
