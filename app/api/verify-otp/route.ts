import { NextRequest } from "next/server";
import { setCookie } from "cookies-next";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { username } = body;

  setCookie("authorize", true, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return new Response(
    JSON.stringify({
      message: `New ${username} authorized.`,
      authorize: true,
    }),
    {
      status: 200,
    }
  );
}
