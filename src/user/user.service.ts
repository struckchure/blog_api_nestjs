import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import UserDAO from './dao/user.dao';
import { UserLoginDTO, UserRegisterDTO } from './dto/user.dto';
import { exclude, generateTokens } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private userDAO: UserDAO) {}

  async registerUser(userRegisterDTO: UserRegisterDTO) {
    userRegisterDTO.password = bcrypt.hashSync(userRegisterDTO.password, 10);
    const user = await this.userDAO.createUser(userRegisterDTO);

    return {
      ...exclude(user, ['password']),
      tokens: await generateTokens({ user_id: user.id }),
    };
  }

  async loginUser(userLoginDTO: UserLoginDTO) {
    const user = await this.userDAO.getUser({
      username: userLoginDTO.username,
    });

    if (!bcrypt.compareSync(userLoginDTO.password, user.password))
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);

    return {
      ...exclude(user, ['password']),
      tokens: await generateTokens({ user_id: user.id }),
    };
  }

  async getUserProfile(userID: string) {
    const user = await this.userDAO.getUser({ id: userID });
    return exclude(user, ['password']);
  }
}
