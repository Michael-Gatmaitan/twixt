"use client"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { selectMongodbID } from '@/lib/slices/userSlice';
import React, { useState, FormEvent } from 'react';

const FormSchema = z.object({
  postContent: z.string().min(2, { message: "Min of 2" })
    .max(64, { message: "Limit exceed" })
});

const PostForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const mongodbID = useAppSelector(selectMongodbID);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);

    console.log({ mongodbID, ...values })

    const postReq = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mongodbID, ...values })
    });
    alert("Submitted");
  }

  // const sub = async () => {
  //   const postReq = await fetch("http://localhost:3000/api/posts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ mongodbID,  })
  //   });
  //   alert("Submitted");

  // }
  // const [val, setVal] = useState("");

  // const handleChange = (e: FormEvent<HTMLInputElement>) => {
  //   setVal(e.currentTarget.value);
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="postContent"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  Post Content
                </FormLabel>
                <FormControl>
                  <Input placeholder='Post content' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />

        {/* <input type="text" onChange={handleChange} /> */}

        <Button className="mt-4" type='submit'>Post</Button>
      </form>
    </Form>
  )
}

export default PostForm;