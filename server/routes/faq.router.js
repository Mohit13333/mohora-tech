import { Router } from "express";
import { authAdmin, authUser } from "../middlewares/auth.middleware.js";
import { createFaq, deleteFaqById, getAllFaq, updateFaqById } from "../controllers/faq.controller.js";

const router = Router();

router.route("/create").post(authUser, authAdmin, createFaq);
router.route("/getall").get(getAllFaq);
router.route("/update/:id").patch(authUser,authAdmin,updateFaqById)
router.route("/delete/:id").delete(authUser,authAdmin,deleteFaqById)

export default router;
