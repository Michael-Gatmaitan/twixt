"use client"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/lib/hooks/reduxHooks';
import { selectMongodbID } from '@/lib/slices/userSlice';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/lib/apiUrl';
import { startTransition, useRef } from 'react';

const FormSchema = z.object({
  formContent: z.string().min(2, { message: "Min of 2" })
    .max(64, { message: "Limit exceed" })
});

interface IPostForm {
  type: "posts" | "comments" | "replies",
  suppID?: string
};

const PostForm = ({ type, suppID }: IPostForm) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const formEl = useRef<null | HTMLInputElement>(null);

  const mongodbID = useAppSelector(selectMongodbID);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {

    // Post as post

    const reqBody: { mongodbID: string, formContent: string, suppID?: string | undefined } = {
      mongodbID,
      ...values
    };

    if (type === "comments" || type === "replies") {
      reqBody.suppID = suppID;
    }

    const postReq = await fetch(`${apiUrl}/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    });

    startTransition(() => {
      router.refresh();
    });

    if (formEl.current !== null) formEl.current.value = "";
  }

  const placeholder = type === "posts" ? "Post something" : type === "comments" ? "Comment to post" : "Reply to user";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex justify-between items-end gap-2'>
        <FormField
          control={form.control}
          name="formContent"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>
                  {placeholder}
                </FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} {...field} ref={formEl} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }} />

        {/* <input type="text" onChange={handleChange} /> */}

        <Button className="mt-4" type='submit'>
          {type[0].toUpperCase() + type.slice(1, type.length)}
        </Button>
      </form>
    </Form>
  )
}

export default PostForm;