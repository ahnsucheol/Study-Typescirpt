import { UserDto } from "../dto/userDto";
import { myDataSource } from "../typeorm/typeorm";

export class UserDao {
  signup = async (user: UserDto, hashedPassword: string): Promise<void> => {
    await myDataSource.query(
      `
        INSERT INTO users(name, email, password) VALUES (?,?,?);
      `,
      [user.name, user.email, hashedPassword]
    );
  };

  getUserByEmail = async (email: string): Promise<object> => {
    const user: object = await myDataSource.query(
      `
        SELECT id, password FROM users WHERE email = ?;
      `,
      [email]
    );
    return user;
  };
}
