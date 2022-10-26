import express from "express";

import userRouter from "./user";
import boardRouter from "./board";

const router = express.Router();

router.use("/users", userRouter);
router.use("/boards", boardRouter);

export default router;
