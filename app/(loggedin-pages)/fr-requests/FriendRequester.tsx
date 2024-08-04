import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import FRButtons from "./FRButtons";
import Link from "next/link";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface IFriendRequester {
  friendshipID: string;
  requesterID: string;
  createdAt: string;
}

const FriendRequester = async ({
  friendshipID,
  requesterID,
  createdAt,
}: IFriendRequester) => {
  const requesterReq = await fetch(`${apiUrl}/user?userID=${requesterID}`);
  const requester = await requesterReq.json();

  if (!requester._id) {
    return <div>Requester not found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <Link href={`/user/${requesterID}`}>
          <CardTitle>{requester.username}</CardTitle>
        </Link>

        <CardDescription>{createdAt}</CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-2">
        <FRButtons friendshipID={friendshipID} />
      </CardFooter>
    </Card>
  );
};

export default FriendRequester;
