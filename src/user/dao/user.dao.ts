import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UserRegisterDTO } from '../dto/user.dto';

export function exclude(object: any, keys: string | any[]) {
  if (!keys.length) return object;

  for (const key of keys) {
    delete object[key];
  }
  return object;
}

@Injectable()
export default class UserDAO {
  constructor(private prisma: PrismaService) {}

  async createUser(userCreateDTO: UserRegisterDTO) {
    return await this.prisma.user.create({ data: userCreateDTO });
  }

  async getUser(where: Prisma.UserWhereUniqueInput) {
    return await this.prisma.user.findUnique({
      where,
    });
  }
}
