import { Router } from "express";

import api from "./api";
import auth from "./auth";
import genre from "./genre";
import users from "./users";
import book from "./book";
import event from "./event";
import borrow from "./borrow";
import subscription from "./subscription";

const router = Router();

router.use("/auth", auth);
router.use("/genre", genre);
router.use("/users", users);
router.use("/books", book);
router.use("/events", event);
router.use("/borrows", borrow);
router.use("/subscriptions", subscription);
router.use(api);

export default router;
