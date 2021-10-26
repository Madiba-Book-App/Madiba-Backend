import { Router } from "express";

import api from "./api";
import auth from "./auth";

const router = Router();

router.use('/auth', auth);
router.use(api);

export default router;
