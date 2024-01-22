import React from "react";
import CustomFormikForm from "../components/CustomFormikForm";

const page = () => {
  return (
    <div className="account-page">
      <main className="flex justify-center w-full flex-col items-center">
        <h1 className="text-3xl font-bold text-center pt-4">Log in</h1>
        <CustomFormikForm formType="login" />
      </main>
    </div>
  );
};

export default page;