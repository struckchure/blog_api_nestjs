export class UserRegisterDTO {
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  password: string;
}

export class UserLoginDTO {
  username: string;
  password: string;
}
