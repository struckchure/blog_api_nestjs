import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDTO, UserRegisterDTO } from './dto/user.dto';
import { AuthRequest } from 'src/middlewares';

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

  @Get('/profile/')
  getUserProfile(@Req() request: AuthRequest) {
    return this.userService.getUserProfile(request.user.id);
  }
}
