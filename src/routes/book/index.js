import { Router } from "express";
import multer from "multer";
import BookController from "../../controllers/book";
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
  upload.single("bookImage"),
  errorHandlerAsync(BookController.create)
);

router.get("/", verifyToken, errorHandlerAsync(BookController.getAll));
router.get("/:id", verifyToken, errorHandlerAsync(BookController.getOne));
router.put(
  "/:id",
  verifyToken,
  upload.single("bookImage"),
  errorHandlerAsync(BookController.update)
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  errorHandlerAsync(BookController.delete)
);

export default router;
