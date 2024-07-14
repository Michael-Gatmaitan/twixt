"use client";

import { UploadButton } from "@/lib/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [imageSrc, setImageSrc] = useState("");

  return (
    <main className="container flex min-h-screen flex-col items-center gap-6 p-24">

      <div className="h-[120px] w-[120px] bg-white rounded-full">
        {imageSrc === "" ? (<span>No image yet.</span>) : (<Image loader={() => imageSrc} src={imageSrc} alt="profile" width={120} height={120} />)}
      </div>

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res: { url: string }[]) => {
          // Do something with the response

          // TODO: Make a route for uploading profile picture.
          /* Make sure the uploading is successful. */

          setImageSrc(res[0].url);
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