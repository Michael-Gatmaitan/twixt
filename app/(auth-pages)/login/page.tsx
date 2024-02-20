import React from "react";
import CustomFormikForm from "../../components/CustomFormikForm";
import { FormikHelpers } from "formik";
// import { getCookie } from "cookies-next";

const page = () => {

  // if (getCookie("mongodbid")) {
  //   return <div>You are already logged in.</div>
  // }

  return (
    <div className="account-page">
      <main className="flex justify-center w-full flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-white pt-4">Log in</h1>
        <CustomFormikForm formType="login" />
      </main>
    </div>
  );
};

export default page;
