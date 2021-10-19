import { Router } from "express";

const router = Router();

router.get("/", (_, res) => res.send("Welcome to Madiba System..."));

export default router;
