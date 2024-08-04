"use client";

import { UploadButton } from "@/lib/utils/uploadthing";
import React from "react";

const UploadProfile = () => {
  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error. asdasdasdd
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
};

export default UploadProfile;
