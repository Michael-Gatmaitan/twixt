"use client";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLabelWarning } from "@/lib/hooks/formWarning";

interface FormikFormProps {
  formType: "login" | "signin";
}

interface UserValInitialState {
  username: string;
  password: string;
}

const initalFormValues: UserValInitialState = {
  username: "",
  password: "",
};

const CustomFormikForm = ({ formType }: FormikFormProps) => {
  const router = useRouter();
  const [usernameExists, setUsernameExists] = useState(false);
  const [accountNotExists, setAccountNotExists] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useLabelWarning(usernameExists, setUsernameExists);
  useLabelWarning(accountNotExists, setAccountNotExists);

  return (
    <Formik
      initialValues={initalFormValues}
      onSubmit={async (
        values: UserValInitialState,
        { setSubmitting, resetForm }: FormikHelpers<UserValInitialState>
      ) => {
        setSubmitting(true);

        const formRequest = async () => {
          if (formType === "login") {
            console.log("Requesting for Logging in / log in");
            // Login
            await fetch("http://localhost:3000/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(values)
            }).then(data => {
              if (!data.ok) {
                console.log("Account do not exists.");
              } else {
                return data.json()
              }
            })
              .then(user => {
                if (user === undefined) {
                  setAccountNotExists(true);
                }
              });
          } else if (formType === "signin") {
            try {
              console.log("Requesting for creating account / sign in");

              await fetch("http://localhost:3000/api/signin", {
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
                } else {
                  router.push("/login");
                }
              });
            } catch (e) {
              console.log("Something wrong with signing user", e)
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

        const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;

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
        <Form className="grid gap-2 mt-4 w-full px-4 lg:w-10/12">
          <label htmlFor="username">Username justify-centerjustify-centerjustify-centerjustify-centerjustify-centerjustify-center</label>
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

          <label htmlFor="password">Password</label>
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
            <label htmlFor="show_password" className="text-sm opacity-80">Show password</label>
          </div>

          <button
            className="secondary-button"
            type="submit"
            disabled={!!errors.username || !!errors.password || isSubmitting || usernameExists}
          >
            {formType === "login" ? "Login" : "Signin"}
          </button>

          <span className="form-label">
            {formType === "login" ? (
              <>
                Dont have an account?{" "}
                <Link className="underline" href="/signin">
                  Signin here.
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

          <span className="text-green-500">Account created successfully.</span>
        </Form>
      )}
    </Formik>
  );
};

export default CustomFormikForm;
