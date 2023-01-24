import { JWTPayload, SignJWT } from 'jose';

export function exclude(object: any, keys: string | any[]) {
  if (!keys.length) return object;

  for (const key of keys) {
    delete object[key];
  }
  return object;
}

export async function generateTokens(data: JWTPayload) {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const access = await new SignJWT(data)
    .setProtectedHeader({ alg: process.env.JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_ACCESS_EXP)
    .sign(secret);

  return { access };
}
