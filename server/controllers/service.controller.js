import Service from "../models/services.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createService = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Avatar is required.",
        error: true,
        success: false,
      });
    }

    const uploadedFile = await uploadOnCloudinary(file.path);

    if (!uploadedFile) {
      return res.status(500).json({
        message: "Failed to upload avatar to Cloudinary.",
        error: true,
        success: false,
      });
    }

    const newService = await Service.create({
      title,
      description,
      avatar: uploadedFile.secure_url,
      price,
    });

    return res.status(201).json({
      message: "Service created successfully",
      error: false,
      success: true,
      service: newService,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to create service.",
      error: true,
      success: false,
    });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json({ services, error: false, success: true, message:"All data fetched" });
  } catch (error) {
    // console.error(error.message);
    return res.status(500).json({
      message: "Failed to fetch services.",
      error: true,
      success: false,
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: "Service not found!",
        error: true,
        success: false,
      });
    }
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({ service, error: false, success: true });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to fetch service by ID.",
      error: true,
      success: false,
    });
  }
};

export const deleteServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        message: "ID is required or not found.",
        error: true,
        success: false,
      });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
        error: true,
        success: false,
      });
    }

    await Service.deleteOne({ _id: id });
    return res.status(200).json({
      message: "Service deleted successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to delete service.",
      error: true,
      success: false,
    });
  }
};

export const updateServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, price } = req.body;
    const file = req.file;

    let updateData = { title, description, price };

    if (file) {
      const uploadedFile = await uploadOnCloudinary(file.path);

      if (!uploadedFile) {
        return res.status(500).json({
          message: "Failed to upload avatar to Cloudinary.",
          error: true,
          success: false,
        });
      }

      updateData.avatar = uploadedFile.secure_url;
    }

    await Service.updateOne({ _id: id }, { $set: updateData });
    return res.status(200).json({
      message: "Service updated successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to update service.",
      error: true,
      success: false,
    });
  }
};
