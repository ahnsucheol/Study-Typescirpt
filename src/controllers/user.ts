import { Request, Response } from "express";
import { UserDto, UserLoginDto } from "../dto/userDto";
import { UserService } from "../services/user";

export class UserController {
  userService = new UserService();

  signup = async (req: Request, res: Response): Promise<void> => {
    const user: UserDto = req.body;
    await this.userService.signup(user);
    res.status(201).json({ message: "Signup successful" });
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const loginData: UserLoginDto = req.body;
    const token: string = await this.userService.login(loginData);
    res.status(200).json({ message: "Login successful", token: token });
  };
}
