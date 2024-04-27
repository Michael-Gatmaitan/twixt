import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

const protectedRoutes = ["/me", "/posts", "/fr-requests", "/fr-req-sent"];
const publicRoutes = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  console.log(session?.userID, session?.userId);
  console.log(isProtectedRoute);

  console.log(isProtectedRoute && !session?.userID);
  if (isProtectedRoute && !session?.userID) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userID &&
    !req.nextUrl.pathname.startsWith("/me")
  ) {
    return NextResponse.redirect(new URL("/me", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
