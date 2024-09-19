"use client";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const SignupForm = () => {
  const [state, action] = useFormState(signup, undefined);

  console.log(state);

  return (
    <main className="w-full">
      <h1 className="text-3xl font-bold text-center">Sign up</h1>
      <form className="container grid gap-4" action={action}>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Name" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" placeholder="Password" name="password" />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}

        {state?.type === "duplicate" ? (
          <Alert variant="destructive">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Ooops!</AlertTitle>
            <AlertDescription>User already exists.</AlertDescription>
          </Alert>
        ) : null}

        <SignupButton />
      </form>
    </main>
  );
};

const SignupButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} disabled={pending} type="submit">
      {pending ? "Submitting..." : "Sign up"}
    </Button>
  );
};

export default SignupForm;
