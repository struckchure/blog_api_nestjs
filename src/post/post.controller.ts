import {
  Body,
  Controller,
  ExecutionContext,
  Get,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';

import { createParamDecorator } from '@nestjs/common';
import { PostCreateDTO } from './dto/post.dto';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user.id;
});

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/')
  createPost(
    @Body(new ValidationPipe()) postCreateDTO: PostCreateDTO,
    @User() userID: string,
  ) {
    postCreateDTO.author_id = userID;
    return this.postService.createPost(postCreateDTO);
  }

  @Get('/')
  listPost() {
    return this.postService.listPost();
  }
}
