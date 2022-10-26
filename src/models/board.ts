import { BoardDto, BoardChangeDto } from "../dto/boardDto";
import { myDataSource } from "../typeorm/typeorm";

export class BoardDao {
  createBoard = async (user_id: string, board: BoardDto): Promise<void> => {
    await myDataSource.query(
      `
        INSERT INTO boards(user_id, title, content) VALUES (?,?,?);
      `,
      [user_id, board.title, board.content]
    );
  };

  isExistsBoard = async (
    user_id: string,
    board_id: string
  ): Promise<object> => {
    console.log(user_id, board_id);
    const isExists = await myDataSource.query(
      `
        SELECT EXISTS (SELECT * FROM boards WHERE user_id = ? AND id = ?) AS SUCCESS;
      `,
      [user_id, board_id]
    );
    console.log(isExists);
    return isExists;
  };

  updateBoard = async (board: BoardChangeDto): Promise<void> => {
    await myDataSource.query(
      `
        UPDATE boards SET title = ?, content = ? WHERE id = ?;
      `,
      [board.title, board.content, board.board_id]
    );
  };

  detailBoard = async (board_id: string): Promise<object> => {
    const data = await myDataSource.query(
      `
        SELECT users.name, title, content FROM boards LEFT JOIN users ON boards.user_id = users.id WHERE boards.id = ?;
      `,
      [board_id]
    );
    console.log("detailBoardDao: ", data);
    return data;
  };

  getAllBoard = async (): Promise<object> => {
    const data = await myDataSource.query(
      `
        SELECT
          users.name,
          boards.id,
          title,
          content,
          DATE_FORMAT(boards.updated_at, '%Y.%m.%d') created_at
        FROM boards LEFT JOIN users ON boards.user_id = users.id;
      `
    );
    return data;
  };

  getMyBoard = async (user_id: string): Promise<object> => {
    const data = await myDataSource.query(
      `
        SELECT id, title, content, DATE_FORMAT(boards.updated_at, '%Y.%m.%d') created_at
          FROM boards
          WHERE boards.user_id = ?;
      `,
      [user_id]
    );
    return data;
  };

  deleteBoard = async (user_id: string, id: string): Promise<void> => {
    await myDataSource.query(
      `
        DELETE FROM boards WHERE user_id = ? AND id = ?;
      `,
      [user_id, id]
    );
  };
}
