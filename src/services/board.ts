import { BoardChangeDto, BoardDto } from "../dto/boardDto";
import { BoardDao } from "../models/board";
import * as jwt from "jsonwebtoken";
import { NotExistError } from "../middleware/createError";

export class TokenVerify {
  public token: string;
  public user_id: string;

  public getUserId(token: string): string {
    const user_id: string | jwt.JwtPayload = jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    console.log("user_id: ", user_id["user_id"]);
    return user_id["user_id"];
  }
}

class CorrectUser {
  public user_id: string;
  public board_id: string;

  // constructor(user_id: string, board_id: string) {
  //   this.isExists(user_id, board_id);
  // }

  isExists = async (user_id: string, board_id: string) => {
    const boardDao = new BoardDao();
    const exists = await boardDao.isExistsBoard(user_id, board_id);
    console.log("SUCCESS: ", exists[0].SUCCESS);
    if (exists[0].SUCCESS === "0") {
      console.log("sdfsdf");
      const err = new NotExistError("You are not Writer!! 제발 보내줘,,,,");
      throw err;
      // throw new Error("dpfjdpfj");
    }
  };
}

interface WriteBoard {
  user_id: string;
  board: BoardDto | BoardChangeDto;
}

class CreateBoard implements WriteBoard {
  user_id: string;
  board: BoardDto;

  constructor(user_id: string, board: BoardDto) {
    this.createBoard(user_id, board);
  }

  createBoard = async (user_id: string, board: BoardDto): Promise<void> => {
    const boardDao = new BoardDao();
    await boardDao.createBoard(user_id, board);
  };
}

class UpdateBoard implements WriteBoard {
  user_id: string;
  board: BoardChangeDto;

  updateBoard = async (board: BoardChangeDto): Promise<void> => {
    const boardDao = new BoardDao();

    await boardDao.updateBoard(board);
  };
}

class getUpdatedBoard {
  board_id: string;

  getUpdatedBoard = async (board_id: string): Promise<object> => {
    const boardDao = new BoardDao();

    const data: object = await boardDao.detailBoard(board_id);
    return data;
  };
}

export class BoardService {
  // 게시글 작성
  createBoard = (token: string, board: BoardDto) => {
    new CreateBoard(token, board);
  };

  updateBoard = async (
    token: string,
    board: BoardChangeDto
  ): Promise<object> => {
    console.log(token, board);
    // 토큰을 user_id로 변환
    const tokenVerify = new TokenVerify();
    const user_id = tokenVerify.getUserId(token);
    console.log("토큰 변환");
    // 작성자가 맞는지 확인
    const test = new CorrectUser();
    test.isExists(user_id, board.board_id);
    console.log("유저 확인");
    // 게시글 업데이트
    const updateBoard = new UpdateBoard();
    updateBoard.updateBoard(board);
    console.log("업데이트");
    // 업데이트 된 게시글 내용 가져오기
    const getBoard = new getUpdatedBoard();
    const data = await getBoard.getUpdatedBoard(board.board_id);
    console.log("updateBoardService2: ", data);
    return data;
  };

  boardDao = new BoardDao();
  getAllBoard = async (): Promise<object> => {
    const data: object = await this.boardDao.getAllBoard();
    return data;
  };

  getMyBoard = async (token: string): Promise<object> => {
    const user_id = jwt.verify(token, process.env.SECRET_KEY)["user_id"];
    const data: object = await this.boardDao.getMyBoard(user_id);
    return data;
  };

  deleteBoard = async (token: string, id: string): Promise<void> => {
    const user_id = jwt.verify(token, process.env.SECRET_KEY)["user_id"];
    await this.boardDao.deleteBoard(user_id, id);
  };
}
