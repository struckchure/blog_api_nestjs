import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { PostCreateDTO, PostUpdateDTO } from '../dto/post.dto';

@Injectable()
export default class PostDAO {
  constructor(private prisma: PrismaService) {}

  async createPost(postCreateDTO: PostCreateDTO) {
    return await this.prisma.post.create({ data: postCreateDTO });
  }

  async listPost() {
    return await this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  async getPost(where: Prisma.PostWhereUniqueInput) {
    return await this.prisma.post.findUnique({
      where,
    });
  }

  async updatePost(postID: string, postUpdateDTO: PostUpdateDTO) {
    return await this.prisma.post.update({
      where: { id: postID },
      data: postUpdateDTO,
    });
  }

  async deletePost(postID: string) {
    return await this.prisma.post.delete({
      where: { id: postID },
    });
  }
}
