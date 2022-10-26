import express from "express";

import { errorHandler } from "../middleware/asyncWrap";

import { UserController } from "../controllers/user";

const router = express.Router();

const userController = new UserController();

router.post("/signup", errorHandler(userController.signup));
// router.get("", userController.getUser);
router.post("/login", errorHandler(userController.login));
// router.patch("", userController.updateUser);

export default router;
