import { jwtVerify, SignJWT } from "jose";

interface Ipayload extends JWTPayload {
  isAuthenticated: boolean;
  initialSetUp: boolean;
  accessCode?: string;
}

// Secret key for signing (must be at least 32 characters long)
const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_COOKIE_SECRET || "your-secure-secret"
);

// Generate a JWT
import { JWTPayload } from "jose";

export async function generateToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h") // Token expires in 1 hour
    .sign(SECRET_KEY);
}

// Verify a JWT
export async function verifyToken(token: string): Promise<Ipayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as Ipayload;
  } catch {
    return null;
  }
}
