"use client"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormDescription, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  postContent: z.string().min(2, { message: "Min of 2" }).max(64, { message: "Limit exceed" })
})

const PostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postContent: "Post"
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="postContent"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Post Content
                </FormLabel>
                <FormControl>
                  <Input placeholder='Post content' {...field} />
                </FormControl>
                <FormDescription>Post at least 2-64 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )
          }} />
      </form>
    </Form>
  )
}

export default PostForm;