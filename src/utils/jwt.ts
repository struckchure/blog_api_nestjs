import { UnauthorizedException } from '@nestjs/common';
import { JWTPayload, JWTVerifyResult, SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SECRET_KEY);

export async function generateTokens(data: JWTPayload) {
  const access = await new SignJWT(data)
    .setProtectedHeader({ alg: process.env.JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_ACCESS_EXP)
    .sign(secret);

  return { access };
}

interface DecodeTokenPayload extends JWTPayload {
  user_id?: string;
}

interface DecodeTokenResult extends JWTVerifyResult {
  payload: DecodeTokenPayload;
}

export async function decodeToken(token: string): Promise<DecodeTokenResult> {
  try {
    return await jwtVerify(token, secret);
  } catch (error) {
    throw new UnauthorizedException(error?.message);
  }
}
