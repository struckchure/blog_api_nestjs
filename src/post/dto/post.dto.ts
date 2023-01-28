import { IsNotEmpty, IsUUID } from 'class-validator';

export class PostCreateDTO {
  @IsUUID()
  author_id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}
