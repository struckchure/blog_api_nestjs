import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './middlewares';

@Module({
  imports: [PostModule, UserModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/post/', method: RequestMethod.GET })
      .forRoutes('/user/profile/', '/post/');
  }
}
