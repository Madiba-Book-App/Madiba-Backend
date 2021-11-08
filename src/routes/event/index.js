import { Router } from "express";
import multer from "multer";
import EventController from "../../controllers/event";
// import joiValidator from "../../middlewares/joiValidator";
// import * as schema from "../../helpers/validation/joi-schemas";
import verifyAdmin from "../../middlewares/verifyAdmin";
import verifyToken from "../../middlewares/verifyToken";
import errorHandlerAsync from "../../middlewares/errorHandler";
import upload from "../../helpers/multer";

const router = Router();

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  upload.single("eventImage"),
  errorHandlerAsync(EventController.create)
);

router.get("/", verifyToken, errorHandlerAsync(EventController.getAll));
router.get("/:id", verifyToken, errorHandlerAsync(EventController.getOne));

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  errorHandlerAsync(EventController.delete)
);

export default router;
