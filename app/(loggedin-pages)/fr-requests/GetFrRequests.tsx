"use client";

import FriendRequester from "@/app/(loggedin-pages)/fr-requests/FriendRequester";
import { useEffect, useState } from "react";
import { formatDistance, subDays } from "date-fns";
import { IFriendRequests } from "@/app";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { selectFriendRequests, setFriendRequests } from "@/lib/slices/statesSlice";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function GetFrRequests() {
  const dispatch = useAppDispatch();
  const friendRequests = useAppSelector(selectFriendRequests);
  const [isFrReqsLoading, setIsFrReqsLoading] = useState(true);
  // const [reqsFriendship, setReqsFriendship] = useState<IFriendRequests[]>([]);

  useEffect(() => {
    async function getFrReqFunc() {
      const response = await fetch(
        `${apiUrl}/fr-requests`
      );
      const result: IFriendRequests[] = await response.json();
      setIsFrReqsLoading(false);
      console.log(result);

      // setReqsFriendship(result);
      dispatch(setFriendRequests(result));
    };

    getFrReqFunc();
  }, [dispatch]);

  if (isFrReqsLoading) {
    return <div>
      Fetching friend requests
    </div>
  }

  return (
    <div>
      {friendRequests.length === 0 ? (<div>No friend requests.</div>) :
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
