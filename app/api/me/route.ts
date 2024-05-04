// import { getMyUserData } from "@/lib/dal";

export async function GET(req: Request) {
  // const me = await getMyUserData();

  // console.log("meemememe: ", me);

  // if (me !== null) {
  //   return new Response(JSON.stringify(me));
  // }

  return new Response(JSON.stringify({ message: "Hello" }), { status: 200 });
}
