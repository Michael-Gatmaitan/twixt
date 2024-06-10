import { apiUrl } from "../apiUrl";

interface IGetCheckIfLiked {
  type: "posts" | "comments" | "replies";
  compID: string;
  userID: string;
}

export async function getCheckIfLiked(props: IGetCheckIfLiked) {
  const { type, compID, userID } = props;
  if (compID === undefined) {
    console.log(compID, userID);
    throw new Error("CompID cannot be undefined");
  }

  const req = await fetch(`${apiUrl}/like?compID=${compID}&userID=${userID}`);

  console.log(req);

  return await req.json();
}
