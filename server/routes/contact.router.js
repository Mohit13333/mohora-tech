import { Router } from "express";
import { createContact, deleteContactsByUserid, getContactsByUserId } from "../controllers/contact.controller.js";

const router = Router();

router.route("/create").post(createContact);
router.route("/getbyuserid").get(getContactsByUserId);
router.route("/deletebyuserid/:id").delete(deleteContactsByUserid);

export default router;
