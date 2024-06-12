"use client"
import FriendRequester from "@/app/(loggedin-pages)/fr-requests/FriendRequester";
import { formatDistance, subDays } from "date-fns";
import { IFriendship } from "@/app";
import { apiUrl } from "@/lib/apiUrl";
import { useEffect, useState } from "react";

export default function GetFrRequests() {

  const [frs, setFrs] = useState<IFriendship[]>([]);

  useEffect(() => {
    async function getFrRequests() {
      const response = await fetch(`${apiUrl}/fr-requests`);
      const frReqs: IFriendship[] = await response.json();

      if (response.ok) {
        setFrs(frReqs);
      }
    }

    getFrRequests();
  }, []);

  return (
    <div>
      {!frs.length ? (<div>No friend requests.</div>) :
        frs.map(reqFriendship => {
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
