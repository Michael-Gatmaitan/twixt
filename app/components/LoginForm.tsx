"use client";
import { login } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { useEffect } from "react";
import PasswordInput from "./PasswordInput";

const LoginForm = () => {
  const [state, action] = useFormState(login, undefined);
  const { pending } = useFormStatus();

  // const disableButtonOnSubmit = () => {

  // }
  useEffect(() => console.log("Pending", pending), [pending]);

  // const [password, setPassword] = useState("");

  return (
    <main className="w-full">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form className="grid gap-4" action={action}>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>

          <PasswordInput id="password" placeholder="Password" name="password" />
        </div>

        <Button type="submit" aria-disabled={pending} disabled={pending}>
          Log in
        </Button>
      </form>
    </main>
  );
};

export default LoginForm;

