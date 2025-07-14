import Booking from "../models/booking.model.js";
import Service from "../models/services.model.js";
import { sendBookingConfirmation, sendBookingNotification } from '../utils/bookingMailer.js';

export const createBooking = async (req, res) => {
  try {
    const { serviceId, customer, bookingDetails } = req.body;
    if (!serviceId || !customer || !bookingDetails) {
      return res.status(400).json({
        message: "Service ID, customer details, and booking details are required.",
        error: true,
        success: false,
      });
    }

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
        error: true,
        success: false,
      });
    }

    // Create new booking
    const newBooking = await Booking.create({
      service: serviceId,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address || null,
      },
      bookingDetails: {
        budget: bookingDetails.budget,
        preferredDate: bookingDetails.preferredDate || null,
        message: bookingDetails.message || null,
        specialRequirements: bookingDetails.specialRequirements || null,
      },
    });

    Promise.all([
      sendBookingConfirmation(newBooking, service),
      sendBookingNotification(newBooking, service, process.env.EMAIL)
    ]).catch(error => {
      console.error('Error sending booking emails:', error);
    });

    return res.status(201).json({
      message: "Booking created successfully",
      error: false,
      success: true,
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({
      message: "Failed to create booking.",
      error: true,
      success: false,
    });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('service');
    return res.status(200).json({ 
      bookings, 
      error: false, 
      success: true, 
      message: "All bookings fetched successfully" 
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to fetch bookings.",
      error: true,
      success: false,
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Booking ID is required.",
        error: true,
        success: false,
      });
    }

    const booking = await Booking.findById(id).populate('service');
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({ 
      booking, 
      error: false, 
      success: true 
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to fetch booking.",
      error: true,
      success: false,
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status, paymentStatus } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Booking ID is required.",
        error: true,
        success: false,
      });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update.",
        error: true,
        success: false,
      });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).populate('service');

    if (!updatedBooking) {
      return res.status(404).json({
        message: "Booking not found.",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Booking updated successfully.",
      error: false,
      success: true,
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to update booking.",
      error: true,
      success: false,
    });
  }
};

export const deleteBookingById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Booking ID is required.",
        error: true,
        success: false,
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
        error: true,
        success: false,
      });
    }

    await Booking.deleteOne({ _id: id });
    return res.status(200).json({
      message: "Booking deleted successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to delete booking.",
      error: true,
      success: false,
    });
  }
};

export const getBookingsByService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    if (!serviceId) {
      return res.status(400).json({
        message: "Service ID is required.",
        error: true,
        success: false,
      });
    }

    const bookings = await Booking.find({ service: serviceId }).populate('service');
    return res.status(200).json({
      bookings,
      error: false,
      success: true,
      message: "Bookings fetched successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to fetch bookings by service.",
      error: true,
      success: false,
    });
  }
};