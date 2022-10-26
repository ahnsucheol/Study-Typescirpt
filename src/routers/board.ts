import express from "express";

import { asyncWrap } from "../middleware/asyncWrap";

import { BoardController } from "../controllers/board";

const router = express.Router();

const boardController = new BoardController();

router.post("", asyncWrap(boardController.createBoard));
router.get("", asyncWrap(boardController.getAllBoard));
router.get("/myboards", asyncWrap(boardController.getMyBoard));
router.patch("", boardController.updateBoard);
router.delete("/:id", asyncWrap(boardController.deleteBoard));

export default router;
