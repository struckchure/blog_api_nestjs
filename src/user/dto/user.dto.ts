import {
  IsAlphanumeric,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class UserRegisterDTO {
  @IsEmpty()
  first_name: string;

  @IsEmpty()
  last_name: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6)
  password: string;
}

export class UserLoginDTO {
  @IsAlphanumeric()
  username: string;

  @Length(6)
  password: string;
}
