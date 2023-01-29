import { Injectable } from '@nestjs/common';
import PostDAO from './dao/post.dao';
import { PostCreateDTO, PostUpdateDTO } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private postDAO: PostDAO) {}

  async createPost(postCreateDTO: PostCreateDTO) {
    return await this.postDAO.createPost(postCreateDTO);
  }

  async listPost() {
    return await this.postDAO.listPost();
  }

  async getPost(postID: string) {
    return await this.postDAO.getPost({ id: postID });
  }

  async updatePost(postID: string, postUpdateDTO: PostUpdateDTO) {
    return await this.postDAO.updatePost(postID, postUpdateDTO);
  }

  async deletePost(postID: string) {
    return await this.postDAO.deletePost(postID);
  }
}
