import { SignJWT, type JWTPayload } from "jose";

// This function signs a payload as a JWT using a frontend-safe secret (for dev/test only)
const encodeJwt = async (payload: JWTPayload) => {
  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_ADMIN_TOKEN);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(secret);

  return token;
};

export default encodeJwt;