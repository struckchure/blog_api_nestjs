import { IsUUID } from 'class-validator';

export class LikeCreateDTO {
  @IsUUID()
  user_id: string;

  @IsUUID()
  post_id: string;
}
