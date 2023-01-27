import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { decodeToken } from 'src/utils';

interface User {
  id: string;
}

export interface AuthRequest extends Request {
  user?: User;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization.replace('Bearer', '').trim();
    const data = await decodeToken(token);
    const userID = data.payload.user_id;

    if (!userID) throw new UnauthorizedException();

    req.user = { id: userID };

    next();
  }
}
