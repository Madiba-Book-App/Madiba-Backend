import { Router } from "express";
import SubscriptionController from "../../controllers/subscription";
// import joiValidator from "../../middlewares/joiValidator";
// import * as schema from "../../helpers/validation/joi-schemas";
import verifyAdmin from "../../middlewares/verifyAdmin";
import verifyToken from "../../middlewares/verifyToken";
import errorHandlerAsync from "../../middlewares/errorHandler";

const router = Router();

router.post(
  "/",
  verifyToken,
  verifyAdmin,
  errorHandlerAsync(SubscriptionController.create)
);

router.get("/", verifyToken, errorHandlerAsync(SubscriptionController.getAll));
router.get(
  "/:id",
  verifyToken,
  errorHandlerAsync(SubscriptionController.getOne)
);
router.put(
  "/:id",
  verifyToken,
  errorHandlerAsync(SubscriptionController.update)
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  errorHandlerAsync(SubscriptionController.delete)
);

export default router;
