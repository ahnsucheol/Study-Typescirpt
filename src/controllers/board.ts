import { Request, Response } from "express";
import { BoardChangeDto, BoardDto } from "../dto/boardDto";
import { BoardService } from "../services/board";

export class BoardController {
  boardService = new BoardService();

  createBoard = async (req: Request, res: Response) => {
    const board: BoardDto = req.body;
    const token: any = req.headers.token;
    try {
      this.boardService.createBoard(token, board);
      res.status(201).json({ message: "Create Board Success" });
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err.message);
    }
  };

  updateBoard = async (req: Request, res: Response) => {
    const { board_id, title, content } = req.body;
    const board: BoardChangeDto = { board_id, title, content };
    const token: any = req.headers.token;
    try {
      const data: object = await this.boardService.updateBoard(token, board);
      console.log("updateBoardController: ", data);
      res.status(201).json({ message: "Update Board Success", data: data });
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err.message);
    } finally {
      console.log("끝"); //안되네,,,
    }
  };

  getAllBoard = async (_req: Request, res: Response) => {
    const data: object = await this.boardService.getAllBoard();
    res.status(200).json(data);
  };

  getMyBoard = async (req: Request, res: Response) => {
    const token: any = req.headers.token;
    const data: object = await this.boardService.getMyBoard(token);
    res.status(200).json(data);
  };

  deleteBoard = async (req: Request, res: Response) => {
    const token: any = req.headers.token;
    const id: string = req.params.id;
    await this.boardService.deleteBoard(token, id);
    res.status(204).json({ message: "Delete Board Success" });
  };
}
