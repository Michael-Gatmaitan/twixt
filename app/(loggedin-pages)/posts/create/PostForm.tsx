"use client"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { apiUrl } from '@/lib/apiUrl';
import { useRef } from 'react';
import { IComment, IReply } from '@/app';

const FormSchema = z.object({
  formContent: z.string().min(2, { message: "Min of 2" })
    .max(64, { message: "Limit exceed" })
});

interface IPostForm {
  type: "posts" | "comments" | "replies",
  suppID?: string;
  appendNewComment?: (newComment: IComment) => void;
  appendNewReply?: (newReply: IReply) => void;


};

const PostForm = ({ type, suppID, appendNewComment, appendNewReply }: IPostForm) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const formEl = useRef<null | HTMLInputElement>(null);
  // const mongodbID = useAppSelector(selectMongodbID);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    // Post as post
    const reqBody: { formContent: string, suppID?: string | undefined } = {
      ...values
    };

    const isTypeNotPost: boolean =
      type === "comments" || type === "replies";

    if (isTypeNotPost) reqBody.suppID = suppID;

    const postReq = await fetch(`${apiUrl}/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    });


    if (type === "comments" && appendNewComment !== undefined) {
      const reqJson: IComment = await postReq.json();
      appendNewComment(reqJson);
    }

    if (type === "replies" && appendNewReply !== undefined) {
      const reqJson: IReply = await postReq.json();
      appendNewReply(reqJson);
    }
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