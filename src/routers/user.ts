import express from "express";

import { asyncWrap } from "../middleware/asyncWrap";

import { UserController } from "../controllers/user";

const router = express.Router();

const userController = new UserController();

router.post("/signup", asyncWrap(userController.signup));
// router.get("", userController.getUser);
router.post("/login", asyncWrap(userController.login));
// router.patch("", userController.updateUser);

export default router;
