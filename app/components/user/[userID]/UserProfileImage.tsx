"use client";
import Image from "next/image";
import React from "react";

const UserProfileImage = ({ src }: { src: string }) => {
  return (
    <div className="w-full h-full flex place-items-center rounded-full overflow-hidden">
      <Image
        loader={() => src}
        src={src}
        width={80}
        height={90}
        alt="profile"
      />
    </div>
  );
};

export default UserProfileImage;
