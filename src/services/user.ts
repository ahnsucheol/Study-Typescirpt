import { UserDto, UserLoginDto } from "../dto/userDto";
import { UserDao } from "../models/user";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UserService {
  userDao = new UserDao();

  signup = async (user: UserDto): Promise<void> => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.userDao.signup(user, hashedPassword);
  };

  login = async (loginData: UserLoginDto): Promise<string> => {
    const user: object = await this.userDao.getUserByEmail(loginData.email);
    if (user) {
      const correct = await bcrypt.compare(
        loginData.password,
        user[0].password
      );
      if (correct) {
        const token = jwt.sign({ user_id: user[0].id }, process.env.SECRET_KEY);
        return token;
      }
    }
  };
}
