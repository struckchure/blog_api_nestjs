import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CommentCreateDTO } from '../dto/comment.dto';

@Injectable()
export default class CommentDAO {
  constructor(private prisma: PrismaService) {}

  async createComment(createCommentDTO: CommentCreateDTO) {
    return await this.prisma.comment.create({ data: createCommentDTO });
  }

  async getComment(where: Prisma.CommentWhereInput) {
    return await this.prisma.comment.findFirst({
      where,
    });
  }

  async deleteComment(where: Prisma.CommentWhereInput) {
    return await this.prisma.comment.deleteMany({ where });
  }
}
