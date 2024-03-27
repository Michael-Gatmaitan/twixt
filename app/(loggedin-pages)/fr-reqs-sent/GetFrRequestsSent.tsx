"use client";
import { useEffect } from "react";
import { formatDistance, subDays } from "date-fns";
import FriendReqReciever from "./FriendReqReciever";
// import { IFriendRequestsSent } from "@/app";
import { IFrRequestsSent } from "@/app";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/reduxHooks";
import { selectFriendRequestsSent, setFriendRequestsSent } from "@/lib/slices/statesSlice";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function GetFrRequests() {
  // const [reqsFriendship, setReqsFriendship] = useState<IFrRequestsSent[]>([]);
  const dispatch = useAppDispatch();
  const friendRequestsSent = useAppSelector(selectFriendRequestsSent);

  useEffect(() => {
    async function getFrReqSentsFunc() {

      const response = await fetch(`${apiUrl}/fr-req-sent`);
      let result = await response.json();

      console.log(result);

      if (result.message) {
        result = [];
      }

      // setReqsFriendship(result);
      dispatch(setFriendRequestsSent(result));
    }

    getFrReqSentsFunc();
  }, [dispatch]);

  return (
    <div>
      {friendRequestsSent.length === 0 ? (<div>No requests sent.</div>) :
        friendRequestsSent.map((friendReqSent: IFrRequestsSent) => {
          const { _id, user2ID, createdAt } = friendReqSent;
          const date = formatDistance(subDays(new Date(createdAt), 0), new Date(), { addSuffix: true });

          return (
            <FriendReqReciever key={_id} friendshipID={_id} requestReciever={user2ID} createdAt={date} />
          )
        })}

    </div>
  )
}