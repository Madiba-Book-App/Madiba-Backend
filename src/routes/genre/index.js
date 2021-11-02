import { Router } from "express";
import genreController from "../../controllers/genres";

const router = Router();

router.get("/", genreController.getAll);

export default router;
