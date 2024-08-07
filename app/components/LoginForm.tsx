"use client"
import { login } from '@/actions/auth';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { forwardRef, useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import PasswordInput from './PasswordInput';

const LoginForm = () => {
  const [state, action] = useFormState(login, undefined);
  const { pending } = useFormStatus();

  // const disableButtonOnSubmit = () => {

  // }
  useEffect(() => console.log("Pending", pending), [pending]);

  const [password, setPassword] = useState("");

  return (
    <main className='w-full'>
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <form className='grid gap-4' action={action}>
        <div className='grid gap-2' >
          {/* <label htmlFor="name">Name</label> */}
          {/* <input id="name" name="name" placeholder="Name" /> */}
          <Label htmlFor='name'>Name</Label>
          <Input id='name' name='name' placeholder='Name' />
        </div>
        <div className='grid gap-2' >
          {/* <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" /> */}
          <Label htmlFor='password'>Password</Label>
          {/* <Input type='password' id='password' name='password' placeholder='Password' /> */}
          <PasswordInput id='password' placeholder='Password' name='password' />
        </div>
        {/* <button type="submit">Log in</button> */}
        <Button type='submit' aria-disabled={pending} disabled={pending}>Log in</Button>
      </form>
    </main >
  )
}

export default LoginForm