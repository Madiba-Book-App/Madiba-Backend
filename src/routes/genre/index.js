import { Router } from "express";
import genreController from "../../controllers/genres";
import errorHandlerAsync from "../../middlewares/errorHandler";

const router = Router();

router.get("/", errorHandlerAsync(genreController.getAll));

export default router;
