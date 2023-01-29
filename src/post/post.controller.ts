import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDTO } from './dto/post.dto';
import { ExtendBodyWithAuthorId } from 'src/utils';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseInterceptors(ExtendBodyWithAuthorId)
  @Post('/')
  createPost(@Body() postCreateDTO: PostCreateDTO) {
    return this.postService.createPost(postCreateDTO);
  }

  @Get('/')
  listPost() {
    return this.postService.listPost();
  }
}
