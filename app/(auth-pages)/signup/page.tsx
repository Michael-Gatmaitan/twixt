import React from "react";
import SignupForm from "@/app/components/SignupForm";

const page = () => {
  return (
    <main className="w-full grid grid-flow-col lg:grid-cols-[600px_minmax(0,_1fr)] mt-14 gap-14">
      {/* <CustomFormikForm formType="signup" /> */}
      <SignupForm />

      <div className="bg-purple-700 hidden lg:block">
        <div className="2xl">Discover a new world here with us!</div>
      </div>
    </main>
  );
};

export default page;
