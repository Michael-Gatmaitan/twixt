"use client";

import { useEffect } from "react";
import { UploadButton } from "@/lib/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { apiUrl } from "@/lib/apiUrl";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [currentDP, setCurrentDP] = useState<string>();
  const [userSelectedNewDP, setUserSelectedNewDP] = useState<boolean>(false);

  useEffect(() => {
    const getImage = async () => {
      const reqCurrentDP = await fetch(`${apiUrl}/upload-profile`);
      const currentDPRes: Awaited<Promise<string>> = await reqCurrentDP.json();

      console.log(currentDPRes);
      setCurrentDP(currentDPRes);
    };

    getImage();
  }, []);

  const profileChanger = async () => {
    if (!currentDP) {
      console.log("Image source of profile is undefined");
      return;
    }
    const changeProfileReq = await fetch(
      `${apiUrl}/upload-profile?profileImageSrc=${currentDP}`,
      {
        method: "POST",
      },
    );

    const changeProfileRes = await changeProfileReq.json();
    console.log(changeProfileRes);

    if (
      "message" in changeProfileRes &&
      changeProfileRes.message === "success"
    ) {
      console.log(changeProfileRes.message);
    } else {
      console.log("Failed to change profile picture");
    }
  };

  return (
    <main className="container flex min-h-screen flex-col items-center gap-6 p-24">
      <div className="h-[120px] w-[120px] bg-white rounded-full overflow-hidden">
        {currentDP === undefined || currentDP == "" || currentDP === null ? (
          <span>You dont have display picture yet.</span>
        ) : (
          <Image
            // loader={() => imageSrc}
            src={currentDP}
            alt="profile"
            width={120}
            height={120}
            className="object-cover h-full"
          />
        )}
      </div>

      {userSelectedNewDP ? (
        <Button onClick={() => profileChanger()}>Set as profile</Button>
      ) : null}

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res: { url: string }[]) => {
          // Do something with the response

          // TODO: Make a route for uploading profile picture.
          /* Make sure the uploading is successful. */

          // setImageSrc(res[0].url);
          setUserSelectedNewDP(true);
          setCurrentDP(res[0].url);
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
