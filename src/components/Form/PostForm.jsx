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
import { useRouter } from "next/navigation";

export default function FormPost({ post, edit, postId }) {
  const form = useForm({
    defaultValues: {
      description: post ? postId.description : "",
      photo: postId ? postId.photo : null,
    },
  });
  const router = useRouter();
  console.log(postId);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.photo);
      formData.append("upload_preset", "my-uploads");

      let postResponse;
      let putResponse;

      if (edit) {
        const response = await fetch("https://api.cloudinary.com/v1_1/dqak1psvn/image/upload", {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();
        const uploadedFileURL = data.secure_url;

        console.log("File uploaded successfully:", uploadedFileURL);

        const postData = {
          photo: uploadedFileURL,
          description: data.description,
        };

        putResponse = await axios.put(`http://localhost:14045/api/content/${postId.id}`, postData, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
      } else {
        const response = await fetch("https://api.cloudinary.com/v1_1/dqak1psvn/image/upload", {
          method: "POST",
          body: formData,
        });

        const responseData = await response.json();
        const uploadedFileURL = responseData.secure_url;

        const postData = {
          photo: uploadedFileURL,
          description: data.description,
        };

        postResponse = await axios.post("http://localhost:14045/api/content/", postData, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
      }

      if (postResponse || putResponse) {
        router.push("/");
        // console.log(serverResponse);
      }

      console.log("post created:", postResponse.data || putResponse);
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label" value={postId.description}>
                {postId.description}
              </FormLabel>
              <FormControl className="text-white">
                <Textarea className="shad-textarea custom-scrollbar" value="akakakak" {...field} />
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
              <FileUploader fieldChange={field.onChange} />
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
