import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import UserDAO from './dao/user.dao';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from 'src/middlewares';

@Module({
  providers: [PrismaService, UserService, UserDAO],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/user/profile/');
  }
}
