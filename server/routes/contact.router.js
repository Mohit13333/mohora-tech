import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { createContact, deleteContactsByUserid, getContactsByUserId } from "../controllers/contact.controller.js";

const router = Router();

router.route("/create").post(authUser, createContact);
router.route("/getbyuserid").get(authUser,getContactsByUserId);
router.route("/deletebyuserid/:id").delete(authUser,deleteContactsByUserid);

export default router;
