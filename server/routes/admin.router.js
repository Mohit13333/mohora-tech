import { Router } from "express";
import { authAdmin, authUser } from "../middlewares/auth.middleware.js";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/admin.controller.js";
import { getAllContact } from "../controllers/contact.controller.js";

const router = Router();

router.route("/getallusers").get(authUser, authAdmin, getAllUsers);
router.route("/user/delete/:id").delete(authUser, authAdmin, deleteUser);
router.route("/user/update/:id").patch(authUser, authAdmin, updateUser);
router.route("/getallcontacts").get(authUser,authAdmin,getAllContact);
export { router };
