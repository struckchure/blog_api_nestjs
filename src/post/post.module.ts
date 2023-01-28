import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import PostDAO from './dao/post.dao';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [PrismaService, PostService, PostDAO],
  controllers: [PostController],
})
export class PostModule {}
