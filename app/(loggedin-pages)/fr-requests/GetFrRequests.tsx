import FriendRequester from "@/app/(loggedin-pages)/fr-requests/FriendRequester";
import { formatDistance, subDays } from "date-fns";
import { IFriendRequests } from "@/app";
import { apiUrl } from "@/lib/apiUrl";

export default async function GetFrRequests() {
  const response = await fetch(
    `${apiUrl}/fr-requests`
    , { cache: 'no-store' });

  const frReqs: IFriendRequests[] = await response.json();

  return (
    <div>
      {!frReqs.length ? (<div>No friend requests.</div>) :
        frReqs.map(reqFriendship => {
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
