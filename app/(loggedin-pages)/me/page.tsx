import MyFriends from "./MyFriends";
import { getUser } from "@/lib/api_calls/getUser";
import { IUserWOPassword } from "@/app";
import MyDetails from "./MyDetails";

export const dynamic = "force-dynamic";

const page = async () => {
  const me: IUserWOPassword | { errorMessage: string } = await getUser();

  console.log(me);
  if ("errorMessage" in me) return <div>{me.errorMessage}</div>;

  if (!me?._id) {
    return <main className="container">No user found</main>;
  }

  console.log(me);

  return (
    <main className="container">
      <MyDetails me={me} />
      <MyFriends userID={me._id} />
    </main>
  );
};

export default page;
