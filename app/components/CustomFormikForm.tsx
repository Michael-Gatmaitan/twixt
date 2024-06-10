"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLabelWarning } from "@/lib/hooks/formWarning";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { selectMongodbID } from "@/lib/slices/userSlice";
import { setLoggedin, setMongodbID, setPassword, setUsername } from "@/lib/slices/userSlice";
import { Button } from "@/components/ui/button";
import { IUser, IUserValidation } from "..";
import { setCookie } from "cookies-next";

interface FormikFormProps {
  formType: "login" | "signup";
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const initalFormValues: IUserValidation = {
  username: "",
  password: "",
};

const CustomFormikForm = ({ formType }: FormikFormProps) => {
  const dispatch = useAppDispatch();
  const mongodbID = useAppSelector(selectMongodbID);

  const router = useRouter();
  const [usernameExists, setUsernameExists] = useState(false);
  const [accountNotExists, setAccountNotExists] = useState(false);

  const [accountCreated, setAccountCreated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useLabelWarning(usernameExists, setUsernameExists);
  useLabelWarning(accountNotExists, setAccountNotExists);

  // async function setCookie(id: string) {
  //   await fetch(`${apiUrl}/cookie?userID=${id}`);
  // }

  return (
    <Formik
      initialValues={initalFormValues}
      onSubmit={async (
        values: IUserValidation,
        { setSubmitting }: FormikHelpers<IUserValidation>
      ) => {
        setSubmitting(true);

        const formRequest = async () => {
          if (formType === "login") {
            console.log("Requesting for Logging in / log in");
            // Login
            await fetch(`${apiUrl}/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(values)
            }).then(data => {
              if (!data.ok) {
                console.log("Account do not exists.");
              } else {
                // Go to posts
                return data.json()
              }
            })
              .then((user: IUser | undefined) => {

                try {

                  if (user !== undefined) {

                    setCookie("authorize", user._id, {
                      maxAge: 60 * 60 * 24 * 7,
                      path: "/",
                    });

                    router.replace("/");

                    dispatch(setUsername(user.username));
                    dispatch(setPassword(user.password));
                    dispatch(setMongodbID(user._id));

                    // router.push("/posts");
                  } else {
                    setAccountNotExists(true);
                  }
                } catch (err) {
                  console.log(err);
                }
              });
          } else if (formType === "signup") {
            try {
              console.log("Requesting for creating account / sign up");
              // use process.env.NEXT_PUBLIC_URL for prod
              await fetch(`${apiUrl}/signup`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }).then(res => {
                setSubmitting(false);
                // Username exists | 409 -> Conflict
                if (res.status === 409) {
                  setUsernameExists(true);
                } else if (res.status === 500) {
                  console.log("No internet connection, internal server error")
                } else {
                  setAccountCreated(true);

                  setTimeout(() => router.push("/login"), 500);
                }
              });
            } catch (e) {
              console.log("Something wrong with signing up user", e)
            }
          }
        };

        formRequest();

        // formType === "login" ? ** : **
      }}
      validate={(values) => {
        setUsernameExists(false);
        const error: {
          username?: string,
          password?: string
        } = {

        };

        const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{6,29}$/;

        if (!values.username) {
          error.username = "Username required!";
        } else if (values.username.length < 6) {
          error.username = "6 or more characters required."
        } else if (!usernameRegex.test(values.username)) {
          error.username = "Username should be unique."
        }

        if (!values.password) {
          error.password = "Password required!";
        } else if (values.password.length < 8) {
          error.password = "8 or more characters required."
        }

        return error;
      }}
    >
      {({
        values,
        errors,
        isSubmitting,
        handleBlur,
        handleChange,
      }) => (
        <Form className="container grid gap-2 mt-2 px-4 2xl:max-w-4xl">
          <label className="form-label" htmlFor="username">Username</label>
          <Field
            className="form-input"
            type="text"
            name="username"
            autoComplete="username"
            spellCheck={false}
          />
          <ErrorMessage
            className="form-label-error"
            name="username"
            component="div"
          />

          {accountNotExists ? <span className="break-words text-sm text-red-600">Account do not exists.</span> : null}

          {usernameExists ? <span className="break-words text-sm text-red-600">
            {`"${values.username}"`} already exists
          </span> : null}

          <label className="form-label" htmlFor="password">Password</label>
          <Field
            className="form-input"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
          />
          <ErrorMessage
            className="form-label-error"
            name="password"
            component="div"
          />

          <div className="show-password flex items-center gap-2">
            <input className="w-4 h-4" type="checkbox" about="show_password" name="show_password" onChange={(e) => {
              setShowPassword(e.target.checked);
            }} />
            <label htmlFor="show_password" className="text-sm text-white text-opacity-80">Show password</label>
          </div>

          <Button
            className="primary-btn"
            type="submit"
            disabled={!!errors.username || !!errors.password || isSubmitting || usernameExists}
          >
            {formType === "login" ? "Login" : "Create account"}
          </Button>

          <span className="form-label">
            {formType === "login" ? (
              <>
                Dont have an account?{" "}
                <Link className="underline" href="/signup">
                  Signup here.
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link className="underline" href="/login">
                  Login here.
                </Link>
              </>
            )}
          </span>

          {accountCreated ? <span className="text-green-500">Account created successfully.</span> : null}
        </Form>
      )}
    </Formik>
  );
};

export default CustomFormikForm;
