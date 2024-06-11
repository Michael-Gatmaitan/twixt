"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_KEY;
const encodeKey = new TextEncoder().encode(secretKey);

type SessionPayload = { userID: string; expiresAt: Date };

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(encodeKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ["HS256"],
    });

    // console.log("Payload in decrypt: ", payload);
    return payload;
  } catch (error) {
    console.log("Decrypt: Failed to verify session");
    return null;
  }
}

export async function createSession(userID: string) {
  // Set session expiration to 1 week (7 days)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userID, expiresAt });

  console.log(session);
  console.log(expiresAt);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  console.log("Updated session: ", cookies().get("session"));
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);
  console.log("Decrypted session:", payload);

  if (!session || !payload) return null;

  // Extend the session expiration to 1 week (7 days)
  const extendedExpireDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: extendedExpireDate,
    sameSite: "lax",
    path: "/",
  });

  console.log("Updated session: ", cookies().get("session"));
}

export async function deleteSession() {
  cookies().delete("session");
}
