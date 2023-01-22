import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDTO, UserRegisterDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register/')
  registerUser(@Body() userRegisterDTO: UserRegisterDTO) {
    return this.userService.registerUser(userRegisterDTO);
  }

  @Post('/login/')
  loginUser(@Body() userLoginDTO: UserLoginDTO) {
    return this.userService.loginUser(userLoginDTO);
  }
}
