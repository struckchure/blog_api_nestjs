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
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthRequest } from 'src/middlewares';
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

  // TODO adds this to a different controller (`LikeController`)
  @Post(':id/like')
  likePost(
    @Request() request: AuthRequest,
    @Param('id', new ParseUUIDPipe()) postID: string,
  ) {
    return this.postService.likePost({
      user_id: request.user.id,
      post_id: postID,
    });
  }

  // TODO adds this to a different controller (`CommentController`)
  @Post(':id/comment')
  commentPost(
    @Request() request: AuthRequest,
    @Param('id', new ParseUUIDPipe()) postID: string,
    @Body('body') body: string,
  ) {
    return this.postService.commentPost({
      user_id: request.user.id,
      post_id: postID,
      body,
    });
  }
}
