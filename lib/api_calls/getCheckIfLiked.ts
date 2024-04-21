import { apiUrl } from "../apiUrl";

interface IGetCheckIfLiked {
  type: "posts" | "comments" | "replies";
  compID: string;
  authID: string;
}

export async function getCheckIfLiked(props: IGetCheckIfLiked) {
  const { type, compID, authID } = props;
  if (compID === undefined || authID === undefined) {
    console.log(compID, authID);
    throw new Error("CompID or AuthID cannot be undefined");
  }

  const req = await fetch(
    `${apiUrl}/like?compID=${compID}&authID=${authID}&doesUserLiked=y`
  );

  console.log(req);

  return await req.json();
}
