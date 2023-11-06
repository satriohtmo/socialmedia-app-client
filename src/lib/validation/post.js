import * as z from "zod";

export const PostValidation = z.object({
  description: z.string().min(2, { message: "at least 2 character(s)" }).max(2000),
  photo: z.array(z.instanceof(File)),
});
