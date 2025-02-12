import { IBook } from "@/types";
import mongoose, { model, models } from "mongoose";

export const bookSchema = new mongoose.Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  coverImg: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pdfFile: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  isNewBook: {
    type: Boolean,
    default: false,
  },
});

const Book = models?.Book || model<IBook>("Book", bookSchema);

export default Book;
