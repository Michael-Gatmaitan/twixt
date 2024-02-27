import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const authorizeID = searchParams.get("userID");

  console.log(authorizeID);

  return new Response("<p>Authorize id has been set.</p>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": `authorize=${authorizeID}`,
    },
  });
  // return new Response("ASDASD");
}
