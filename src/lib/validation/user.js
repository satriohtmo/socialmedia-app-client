import * as z from "zod";

export const UserValidation = z.object({
  name: z.string().min(3).max(20),
  username: z.string().min(3).max(20),
  bio: z.string().max(500),
  email: z.string().email(),
  password: z.string().min(5),
});
