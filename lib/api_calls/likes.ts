import { apiUrl } from "../apiUrl";

interface IPostLike {
  compID: string;
  userID: string;
  type: "post" | "comment" | "reply";
}

export async function postLike(postLikeParams: IPostLike) {
  const { compID, userID } = postLikeParams;

  if (compID === undefined || userID === undefined) {
    throw new Error(
      "CompID or AuthID cannot be undeinfed: lib/api_calls/like.ts"
    );
  }

  const newLike = await fetch(`${apiUrl}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postLikeParams),
  });

  console.log(newLike);
}

interface IDeleteLike {
  type: "post" | "comment" | "reply";
  compID: string;
  userID: string;
}

export async function deleteLike(deleteLikeParams: IDeleteLike) {
  // const { compID, userID } = deleteLikeParams;

  const deleteLikeReq = await fetch(`${apiUrl}/like`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deleteLikeParams),
  });

  // console.log(compID, userID, deleteLikeReq);

  return await deleteLikeReq.json();
}
