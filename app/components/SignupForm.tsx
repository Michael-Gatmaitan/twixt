"use client"
import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const SignupForm = () => {
  const [state, action] = useFormState(signup, undefined);

  return (
    <main className="w-full">
      <h1 className="text-3xl font-bold text-center">Sign up</h1>
      <form className='container grid gap-4' action={action}>
        <div className='grid gap-2'>
          {/* <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" /> */}
          <Label htmlFor='name'>Name</Label>
          <Input id='name' name='name' placeholder='Name' />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}

        <div className="grid gap-2">
          {/* <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" /> */}
          <Label htmlFor='password'>Password</Label>
          <Input id='password' name='password' placeholder='Password' />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map(error => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}

        <SignupButton />
      </form>
    </main>
  )
}

const SignupButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit">
      {pending ? "Submitting..." : "Sign up"}
    </Button>
  )
}

export default SignupForm
