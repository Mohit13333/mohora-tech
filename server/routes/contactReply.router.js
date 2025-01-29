import { Router } from "express";
import { authAdmin, authUser } from "../middlewares/auth.middleware.js";
import { deleteReply, getAllReply, replyToContact, updateReply } from "../controllers/contactReply.controller.js";

const router = Router();

router.route("/create/:id").post(authUser, authAdmin, replyToContact);
router.route("/getreplies").get(authUser,authAdmin,getAllReply)
router.route("/delete/:id").delete(authUser,authAdmin,deleteReply);
router.route("/update/:id").put(authUser,authAdmin,updateReply);

export default router
