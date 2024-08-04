import { apiUrl } from "../apiUrl";

type IUpdateFriendship = {
  friendshipID: string;
  response: "accepted" | "rejected" | "pending";
};

export const updateFriendship = async ({
  friendshipID,
  response,
}: IUpdateFriendship) => {
  const updateRequest = await fetch(`${apiUrl}/fr-requests`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      friendshipID,
      response: response,
    }),
  });

  return await updateRequest.json();
};
