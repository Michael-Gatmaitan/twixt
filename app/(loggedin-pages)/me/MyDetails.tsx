import { IUserWOPassword } from "@/app";
import { timeDistance } from "@/lib/time_formatters/timeDistance";
import { Calendar, Pencil } from "lucide-react";
import React from "react";
import ChangeProfileButton from "./ChangeProfileButton";
import Image from "next/image";

const MyDetails = ({ me }: { me: IUserWOPassword }) => {
  const dateJoined: Date | string = timeDistance(me.createdAt);
  console.log(me.profileImageSrc);

  return (
    <div className="grid gap-2 text-white">
      <div className="text-sm font-medium text-white text-opacity-80">
        # {me.username}
      </div>
      <div className="flex gap-4 items-center">
        {/* Profile and username */}
        <div className="relative w-20 h-20 bg-slate-500 rounded-full">
          {/* <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden"> */}
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image
              // loader={() => me.profileImageSrc}
              src={me.profileImageSrc}
              alt="profile"
              width={120}
              height={120}
              className="object-cover h-full"
            />
          </div>
          <ChangeProfileButton />
        </div>
        <div className="text-4xl font-bold">{me.username}</div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="text-base font-medium">{me.bio}</div>
        <Pencil />
      </div>

      <div className="flex gap-2 items-center">
        <Calendar width={18} height={18} />
        <div className="text-base text-white text-opacity-80">
          You joined {dateJoined}
        </div>
      </div>
    </div>
  );
};

export default MyDetails;
