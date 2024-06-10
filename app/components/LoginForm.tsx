"use client"
import { login } from '@/actions/auth';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';

const LoginForm = () => {
  const [state, action] = useFormState(login, undefined);
  const { pending } = useFormStatus();

  // const disableButtonOnSubmit = () => {

  // }

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
          <Input id='password' name='password' placeholder='Password' />
        </div>
        {/* <button type="submit">Log in</button> */}
        <Button type='submit' aria-disabled={pending} disabled={pending}>Log in</Button>
      </form>
    </main >
  )
}

export default LoginForm