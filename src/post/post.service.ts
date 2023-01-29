import { Injectable } from '@nestjs/common';
import LikeDAO from './dao/like.dao';
import PostDAO from './dao/post.dao';
import { LikeCreateDTO } from './dto/like.dto';
import { PostCreateDTO, PostUpdateDTO } from './dto/post.dto';
import CommentDAO from './dao/comment.dao';
import { CommentCreateDTO } from './dto/comment.dto';

@Injectable()
export class PostService {
  constructor(
    private postDAO: PostDAO,
    private likeDAO: LikeDAO,
    private commentDAO: CommentDAO,
  ) {}

  async createPost(postCreateDTO: PostCreateDTO) {
    return await this.postDAO.createPost(postCreateDTO);
  }

  async listPost() {
    return await this.postDAO.listPost();
  }

  async getPost(postID: string) {
    // TODO add all db(prisma) related queries to `DAO` class
    return await this.postDAO.getPost(
      { id: postID },
      {
        comments: {
          select: {
            id: true,
            body: true,
            user: {
              select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                created_at: true,
                updated_at: true,
              },
            },
          },
        },
      },
    );
  }

  async updatePost(postID: string, postUpdateDTO: PostUpdateDTO) {
    return await this.postDAO.updatePost(postID, postUpdateDTO);
  }

  async deletePost(postID: string) {
    return await this.postDAO.deletePost(postID);
  }

  // TODO add to seperate service (`LikeService`)
  async likePost(likeCreateDTO: LikeCreateDTO) {
    const like_exists = await this.likeDAO.getLike({
      post_id: likeCreateDTO.post_id,
      user_id: likeCreateDTO.user_id,
    });

    if (!like_exists) {
      await this.likeDAO.createLike(likeCreateDTO);
    } else {
      await this.likeDAO.deleteLike({
        post_id: likeCreateDTO.post_id,
        user_id: likeCreateDTO.user_id,
      });
    }

    return await this.getPost(likeCreateDTO.post_id);
  }

  // TODO add to seperate service (`PostService`)
  async commentPost(commentCreateDTO: CommentCreateDTO) {
    await this.commentDAO.createComment(commentCreateDTO);

    return await this.getPost(commentCreateDTO.post_id);
  }
}
