import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

Injectable();
export class ExtendBodyWithAuthorId implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    request.body.author_id = request.user.id;
    return next.handle();
  }
}
