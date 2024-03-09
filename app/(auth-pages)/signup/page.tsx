import React from "react";
import CustomFormikForm from "../../components/CustomFormikForm";

const page = () => {
  return (
    <div className="container">
      <main className="flex justify-center w-full flex-col items-center">

        <h1 className="text-3xl font-bold text-center text-white pt-4">Sign up</h1>
        <CustomFormikForm formType="signup" />
      </main>
    </div>
  );
};

export default page;
