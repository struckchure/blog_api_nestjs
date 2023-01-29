import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class PostCreateDTO {
  @IsUUID()
  author_id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}

export class PostUpdateDTO {
  @IsOptional()
  @IsAlphanumeric()
  title: string;

  @IsOptional()
  @IsAlphanumeric()
  body: string;
}
