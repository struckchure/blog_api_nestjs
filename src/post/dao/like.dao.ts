import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { LikeCreateDTO } from '../dto/like.dto';

@Injectable()
export default class LikeDAO {
  constructor(private prisma: PrismaService) {}

  async createLike(createLikeDTO: LikeCreateDTO) {
    return await this.prisma.like.create({ data: createLikeDTO });
  }

  async getLike(where: Prisma.LikeWhereInput) {
    return await this.prisma.like.findFirst({
      where,
    });
  }

  async deleteLike(where: Prisma.LikeWhereInput) {
    return await this.prisma.like.deleteMany({ where });
  }
}
