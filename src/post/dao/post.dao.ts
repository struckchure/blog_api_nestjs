import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PostCreateDTO } from '../dto/post.dto';

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
}
