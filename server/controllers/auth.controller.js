import User from "../models/user.model.js";
import { AuthOtp } from "../utils/userOtp.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser) {
      if (!existingUser.isVerified) {
        const { otp } = await AuthOtp({ to: email });
        existingUser.otp = otp;
        existingUser.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await existingUser.save();
        return res.status(200).json({
          message: "OTP resent. Please verify to complete registration.",
          success: true,
          error: false,
        });
      }
      return res
        .status(400)
        .json({ error: "User already exists and is verified" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { otp } = await AuthOtp({ to: email });
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      otp,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });

    res.status(200).json({
      message: "Verify the OTP sent to your email.",
      userId: user._id,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed. Please try again.",
      error: true,
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Invalid credentials or user does'nt exist!" });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: process.env.EXPIRY_ACCESS_TOKEN,
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: process.env.EXPIRY_REFRESH_TOKEN,
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("access_token", accessToken, cookiesOption);
    res.cookie("refresh_token", refreshToken, cookiesOption);
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Login failed please try again",
      error: true,
      success: false,
    });
  }
};

export const logout = (req, res) => {
  try {
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("access_token", cookiesOption);
    res.clearCookie("refresh_token", cookiesOption);

    res.status(200).json({
      message: "Logged out successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed. Please try again.",
      error: true,
      success: false,
    });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: process.env.EXPIRY_ACCESS_TOKEN,
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: process.env.EXPIRY_REFRESH_TOKEN,
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("access_token", accessToken, cookiesOption);
    res.cookie("refresh_token", refreshToken, cookiesOption);

    res.status(200).json({
      message: "OTP verified successfully. Registration complete.",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      success: true,
      error: false,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "OTP verification failed", error: true, success: false });
  }
};
export const getUsersById = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({ message: "userId is required" });
    }
    const user = await User.findById(id).select({ password: 0 });

    return res.status(200).json({ user, error: false, success: true });
  } catch (error) {
    return res
      .status(error.status)
      .json({ message: "Failed to fetch user", error: true, success: false });
  }
};
