import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ExtendBodyWithAuthorId } from 'src/utils';
import { PostCreateDTO, PostUpdateDTO } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseInterceptors(ExtendBodyWithAuthorId)
  @Post()
  createPost(@Body() postCreateDTO: PostCreateDTO) {
    return this.postService.createPost(postCreateDTO);
  }

  @Get()
  listPost() {
    return this.postService.listPost();
  }

  @Get(':id')
  getPost(@Param('id', new ParseUUIDPipe()) postID: string) {
    return this.postService.getPost(postID);
  }

  @Put(':id')
  updatePost(
    @Param('id', new ParseUUIDPipe()) postID: string,
    @Body() postUpdateDTO: PostUpdateDTO,
  ) {
    return this.postService.updatePost(postID, postUpdateDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param('id', new ParseUUIDPipe()) postID: string) {
    return this.postService.deletePost(postID);
  }
}
