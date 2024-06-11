import { NextResponse, NextRequest } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";
import { verifySession } from "./lib/dal";

const protectedRoutes = ["/me", "/posts", "/fr-requests", "/fr-req-sent"];
const publicRoutes = ["/login", "/signup"];

function pathIncludes(path: string, routes: string[]): boolean {
  if (path[path.length - 1] === "/") return false;

  // for (let i = 0; i < routes.length; i++) {
  //   const curr = routes[i];
  //   if (path.includes(curr)) return true;
  // }

  return false;
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = pathIncludes(path, protectedRoutes);
  const isPublicRoute = pathIncludes(path, publicRoutes);

  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // const v = (await verifySession()).userID as string;
  // console.log(v);

  console.log(session);

  if (isProtectedRoute && !session?.userID && !path.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.userID && !path.startsWith("/me")) {
    return NextResponse.redirect(new URL("/me", req.nextUrl));
  }

  // return NextResponse.redirect(new URL("/login", req.nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
