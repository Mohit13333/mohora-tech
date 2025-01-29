import { Router } from "express";
import { authAdmin, authUser } from "../middlewares/auth.middleware.js";
import {
  createService,
  deleteServiceById,
  getAllServices,
  getServiceById,
  updateServiceById,
} from "../controllers/service.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(authUser, authAdmin, upload, createService);
router.route("/getall").get(getAllServices);
router.route("/get/:id").get(authUser, getServiceById);
router.route("/delete/:id").delete(authUser, authAdmin, deleteServiceById);
router.route("/update/:id").put(authUser, authAdmin, upload, updateServiceById);

export default router;
