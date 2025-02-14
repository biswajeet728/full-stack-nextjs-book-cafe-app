import mongoose from "mongoose";

export type ROLE = "user" | "author";

export interface IUser {
  _id: mongoose.ObjectId;
  username: string;
  email: string;
  password: string;
  profileImg?: string | null;
  role: ROLE;
}

export interface IBook {
  _id: string;
  title: string;
  coverImg: string;
  description: string;
  pdfFile: string;
  author: string;
  authorId: string;
  genre: string;
  isNewBook: boolean;
}

export interface IBookDetails {
  bookData: IBook | null;
  setBookData: React.Dispatch<React.SetStateAction<IBook | null>>;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
