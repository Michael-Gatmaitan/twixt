import { IUser } from "@/app";
import { verifySession } from "@/lib/dal";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

// url params: userID?

export async function GET(req: NextRequest, res: Response) {
  const searchParams = req.nextUrl.searchParams;
  const userIDq = searchParams.get("userID");

  console.log(req.cookies.getAll().length);

  const allCookies = cookies().getAll();
  console.log(`allll coooookiesss ${allCookies.length}`);

  await connectDB();

  try {
    if (!userIDq) {
      // Get the current user's details
      const userID = (await verifySession()).userID;
      console.log("User id for ffff", userID);
      const user: IUser | null = await User.findOne(
        {
          _id: userID,
        },
        { password: 0 }
      );
      // return new Response(JSON.stringify({ message: "No userID passed" }), {
      //   status: 500,
      // });
      if (!user?._id) {
        return new Response(
          JSON.stringify({ message: "No user found (no query params)." }),
          {
            status: 500,
          }
        );
      }
      return new Response(JSON.stringify(user), { status: 200 });
    }

    const user = await User.findOne({
      _id: userIDq,
    });

    if (!user)
      return new Response(JSON.stringify({ message: "No user detected" }), {
        status: 500,
      });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.log(`error: ${err}`);
    return new Response(JSON.stringify({ message: "No user" }), {
      status: 200,
    });
  }
}
