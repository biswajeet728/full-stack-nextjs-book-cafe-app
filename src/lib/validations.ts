import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  profileImg: z.string().url().or(z.literal("")).optional(),
});

export const signInSchema = z.object({
  email: z.string().email({
    message: "Invalid email format",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const bookSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  coverImg: z.string().url({
    message: "Cover Image must be a valid URL",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long",
  }),
  pdfFile: z.string().url({
    message: "PDF File must be a valid URL",
  }),
  genre: z.string().min(3, { message: "Genre must be at least 3 characters" }),
  isNewBook: z.boolean().optional(),
});
