"use client";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import FileUploader from "../Shared/FileUploader";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FormPost() {
  const form = useForm({
    defaultValues: {
      description: "",
      photo: null,
    },
  });
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("access_token");

    if (!isLoggedIn) {
      router.push("/sign-in");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.photo);
      formData.append("upload_preset", "my-uploads");

      let postResponse;
      let putResponse;

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

      postResponse = await axios.post("https://captiverse-app.up.railway.app/api/content/", postData, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      if (postResponse) {
        router.push("/");
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
              <FormLabel className="shad-form_label"></FormLabel>
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
