export async function GET(req: Request) {
  // let me: UserType | null = null;

  // me = await User.findOne({
  //   _id: ,
  // });

  // console.log(me);

  return new Response(JSON.stringify({ message: "Hello" }), { status: 200 });
}
