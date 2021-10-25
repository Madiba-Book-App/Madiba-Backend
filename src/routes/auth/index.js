import { Router } from "express";
import signupController from '../../controllers/auth/signup'
const router = Router();

router.post("/signup", signupController.signup);

export default router;
