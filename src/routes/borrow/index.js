import { Router } from "express";
import BorrowController from "../../controllers/borrow";
// import joiValidator from "../../middlewares/joiValidator";
// import * as schema from "../../helpers/validation/joi-schemas";
import errorHandlerAsync from "../../middlewares/errorHandler";
import verifyToken from "../../middlewares/verifyToken";

const router = Router();

router.post("/", verifyToken, errorHandlerAsync(BorrowController.create));
router.get("/", verifyToken, errorHandlerAsync(BorrowController.getAll));

export default router;
