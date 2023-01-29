import { IsAlphanumeric, IsUUID } from 'class-validator';

export class CommentCreateDTO {
  @IsUUID()
  user_id: string;

  @IsUUID()
  post_id: string;

  @IsAlphanumeric()
  body: string;
}
