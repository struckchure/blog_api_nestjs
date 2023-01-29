import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import PostDAO from './dao/post.dao';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import LikeDAO from './dao/like.dao';
import CommentDAO from './dao/comment.dao';

// TODO seperate `LikeDAO` and `CommentDAO`

@Module({
  providers: [PrismaService, PostService, PostDAO, LikeDAO, CommentDAO],
  controllers: [PostController],
})
export class PostModule {}
