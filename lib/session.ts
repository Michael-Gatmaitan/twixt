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
    .setExpirationTime("7d")
    .sign(encodeKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodeKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userID: string) {
  const expiresAt = new Date(Date.now() * 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userID, expiresAt });

  console.log(session);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  // const c = cookies().get("session")?.value;
  const s = await decrypt(session);

  console.log("expires", s?.expiresAt);
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);
  console.log("Decrypted session:", payload);

  if (!session || !payload) return null;

  const extendedExpireDate = new Date(Date.now() * 7 * 24 * 60 * 60 * 1000);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: extendedExpireDate,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  cookies().delete("session");
}
