"use client";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "../../lib/validation/user";
import { Textarea } from "../ui/textarea";
import FileUploader from "../Shared/FileUploader";
import { PostValidation } from "@/lib/validation/post";
import axios from "axios";
import { Toaster, toast } from "sonner";

export default function FormPost({ post }) {
  const form = useForm({
    defaultValues: {
      description: post ? post.description : "",
      photo: post ? post.photo : "",
    },
    resolver: zodResolver(PostValidation),
  });

  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // logic disini
    // try {
    //   const post = await axios.post(
    //     `http://localhost:14045/api/post/`,
    //     {
    //       ...values,
    //     },
    //     {
    //       headers: {
    //         access_token: localStorage.getItem("access_token"),
    //       },
    //     }
    //   );
    //   if (!post) {
    //     toast.error("try again !");
    //   }
    //   return post.data;
    // } catch (err) {
    //   return [];
    // }
    // export async function updateUser(id, name, address, email) {
    //   try {
    //     const { data } = await axios.put(
    //       `http://localhost:14045/api/user/${id}`,
    //       {
    //         name,
    //         address,
    //         email,
    //       },
    //       {
    //         headers: {
    //           access_token: localStorage.getItem("access_token"),
    //         },
    //       }
    //     );
    //     return data.data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // console.log(values);
    // alert("alo");
    alert(values.description);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Description</FormLabel>
              <FormControl className="text-white">
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photo</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button type="submit" className="shad-button_dark_4">
            Submit
            <Toaster richColors />
          </Button>
        </div>
      </form>
    </Form>
  );
}
