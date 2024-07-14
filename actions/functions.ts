import { IFriendship } from "@/app";
import { getUser } from "@/lib/api_calls/getUser";

export const defineFriendID = (friendship: IFriendship) => {
  const getFriendID: () => string | null = () => {
    let friendID: string | null = "";
    const getMyInfo = (async () => await getUser())();
    getMyInfo.then((res) => {
      friendID = res._id;
    });

    return friendID;
  };

  // let s: string | null = null;
  // const g = (async () => await getUser())();
  // g.then((res) => {
  //   if (!res._id) {
  //     s = null;
  //     return;
  //   }
  //   s = res._id;
  //   return;
  // });

  // if (!friendship._id) return null;

  if (getFriendID() === null) {
    throw new Error("ID should not be null");
  }

  return friendship.user1ID === getFriendID()
    ? friendship.user2ID
    : friendship.user1ID;
};
