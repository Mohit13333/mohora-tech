import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select({ password: 0 });
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "Users not found !", error: true, success: false });
    }
    return res.status(200).json({
      users:users,
      message: "All User fetched.",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch users. Please try again later.",
      error: true,
      success: false,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res
        .status(400)
        .json({ message: "UserId is required", error: true, success: false });
    }
    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found !", error: true, success: false });
    } else {
      return res.status(200).json({
        message: "User deleted successfully",
        error: false,
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete user. Please try again later.",
      error: true,
      success: false,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await User.updateOne({ _id: id }, { $set: data });
    return res.status(200).json({
      message: "User updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update user. Please try again later.",
      error: true,
      success: false,
    });
  }
};
