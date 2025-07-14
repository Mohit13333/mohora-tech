import { Router } from "express";
import { authUser, authAdmin } from "../middlewares/auth.middleware.js";
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBookingById,
    getBookingsByService,
} from "../controllers/booking.controller.js";

const router = Router();

router.route("/create").post(createBooking);

router.route("/getall").get(authUser, authAdmin, getAllBookings);

router.route("/service/:serviceId").get(authUser, getBookingsByService);

router.route("/get/:id").get(authUser, getBookingById);

router.route("/update-status/:id").put(authUser, authAdmin, updateBookingStatus);

router.route("/delete/:id").delete(authUser, authAdmin, deleteBookingById);

export default router;