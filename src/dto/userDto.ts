export class UserLoginDto {
  email: string;
  password: string;
}

export class UserDto extends UserLoginDto {
  name: string;
}
