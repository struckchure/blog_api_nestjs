import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import UserDAO from './dao/user.dao';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [PrismaService, UserService, UserDAO],
  controllers: [UserController],
})
export class UserModule {}
