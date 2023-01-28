import { Injectable } from '@nestjs/common';
import PostDAO from './dao/post.dao';
import { PostCreateDTO } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private postDAO: PostDAO) {}

  async createPost(postCreateDTO: PostCreateDTO) {
    return await this.postDAO.createPost(postCreateDTO);
  }

  async listPost() {
    return await this.postDAO.listPost();
  }
}
