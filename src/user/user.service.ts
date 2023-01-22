import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JWTPayload, SignJWT } from 'jose';
import UserDAO from './dao/user.dao';
import { UserLoginDTO, UserRegisterDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private userDAO: UserDAO) {}

  async generateTokens(data: JWTPayload) {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const access = await new SignJWT(data)
      .setProtectedHeader({ alg: process.env.JWT_ALG })
      .setIssuedAt()
      .setExpirationTime(process.env.JWT_ACCESS_EXP)
      .sign(secret);

    return { access };
  }

  async registerUser(userRegisterDTO: UserRegisterDTO) {
    userRegisterDTO.password = bcrypt.hashSync(userRegisterDTO.password, 10);
    const user = await this.userDAO.createUser(userRegisterDTO);

    return { ...user, tokens: await this.generateTokens({ user_id: user.id }) };
  }

  async loginUser(userLoginDTO: UserLoginDTO) {
    const user = await this.userDAO.getUser({
      username: userLoginDTO.username,
    });

    if (!bcrypt.compareSync(userLoginDTO.password, user.password))
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    return { ...user, tokens: await this.generateTokens({ user_id: user.id }) };
  }
}
