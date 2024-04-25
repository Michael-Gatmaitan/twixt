import React from "react";
import CustomFormikForm from "../../components/CustomFormikForm";
import { FormikHelpers } from "formik";
import LoginForm from "@/app/components/LoginForm";
// import { getCookie } from "cookies-next";

const page = () => {

  // if (getCookie("mongodbid")) {
  //   return <div>You are already logged in.</div>
  // }

  return (
    <main className="w-full grid grid-flow-col lg:grid-cols-[600px_minmax(0,_1fr)] mt-14 gap-14">
      {/* <h1 className="text-3xl font-bold text-center pt-4">Log in</h1> */}
      {/* <CustomFormikForm formType="login" /> */}
      <LoginForm />

      <div className="bg-purple-700 hidden lg:block">
        <div className="2xl">Discover a new world here with us!</div>
      </div>
    </main>
  );
};

export default page;
