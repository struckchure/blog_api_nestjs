import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BlogModule, UserModule],
})
export class AppModule {}
