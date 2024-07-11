// "use client"
import FriendRequester from "@/app/(loggedin-pages)/fr-requests/FriendRequester";
import { formatDistance, subDays } from "date-fns";
import { IFriendship } from "@/app";
import { apiUrl } from "@/lib/apiUrl";
// import { useEffect, useState } from "react";
import { cookies } from "next/headers";

const GetFrRequests = async () => {

  const friendRequestsReq = await fetch(`${apiUrl}/fr-requests`, {
    headers: { Cookie: cookies().toString() }
  });
  const friendRequests: IFriendship[] = await friendRequestsReq.json();

  return (
    <div>
      {!friendRequests.length ? (<div>No friend requests.</div>) :
        friendRequests.map(reqFriendship => {
          const { _id, user1ID, createdAt } = reqFriendship;
          const date = formatDistance(subDays(new Date(createdAt), 0), new Date(), { addSuffix: true });

          return (
            <div key={_id}>
              <FriendRequester friendshipID={_id} requesterID={user1ID} createdAt={date} />
            </div>
          )
        })}
    </div>
  );
}

export default GetFrRequests;