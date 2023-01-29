import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import PostDAO from './dao/post.dao';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  providers: [PrismaService, PostService, PostDAO],
  controllers: [PostController],
})
export class PostModule {}
