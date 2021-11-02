import { Router } from "express";

import api from "./api";
import auth from "./auth";
import genre from "./genre";

const router = Router();

router.use("/auth", auth);
router.use("/genre", genre);
router.use(api);

export default router;
