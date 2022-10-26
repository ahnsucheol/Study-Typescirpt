import express from "express";

import { errorHandler } from "../middleware/asyncWrap";

import { BoardController } from "../controllers/board";

const router = express.Router();

const boardController = new BoardController();

router.post("", errorHandler(boardController.createBoard));
router.get("", errorHandler(boardController.getAllBoard));
router.get("/myboards", errorHandler(boardController.getMyBoard));
router.patch("", errorHandler(boardController.updateBoard));
router.delete("/:id", errorHandler(boardController.deleteBoard));

export default router;
