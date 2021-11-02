import { Router } from "express";
import signupController from "../../controllers/auth";

const router = Router();

router.post("/signup", signupController.signup);
router.post("/login", signupController.login);

export default router;
