import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { PostCreateDTO, PostUpdateDTO } from '../dto/post.dto';

@Injectable()
export default class PostDAO {
  constructor(private prisma: PrismaService) {}

  async createPost(postCreateDTO: PostCreateDTO) {
    return await this.prisma.post.create({
      data: postCreateDTO,
    });
  }

  async listPost() {
    return await this.prisma.post.findMany({
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
  }

  async getPost(
    where: Prisma.PostWhereUniqueInput,
    include?: Prisma.PostInclude,
  ) {
    return await this.prisma.post.findUnique({
      where,
      include: {
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        ...include,
      },
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
