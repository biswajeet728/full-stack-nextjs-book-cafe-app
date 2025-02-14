"use server";

import { connectToDB } from "@/db/connection";
import Book from "@/db/models/_book.model";
import dummyBooks from "./../../../book-data.json";
import { IBook } from "@/types";
import _ from "lodash";
import { auth } from "@/auth";
import User from "@/db/models/_user.model";
import { revalidatePath } from "next/cache";

export const seedBooks = async () => {
  try {
    await connectToDB();
    await Book.insertMany(dummyBooks);

    return {
      success: true,
    };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2), "Books");
    return {
      success: false,
      error: "Error occurred while seeding books",
    };
  }
};

export const getAllBooks = async (query?: string) => {
  try {
    await connectToDB();

    let books = [];

    if (query) {
      books = await Book.find({
        title: { $regex: query, $options: "i" },
      }).lean();
    } else {
      books = await Book.find({}).lean();

      books = _.shuffle(books);
    }

    const serializedBooks = (books as unknown as IBook[]).map(
      (book: IBook) => ({
        ...book,
        _id: book._id.toString(),
      })
    );

    return {
      success: true,
      books: serializedBooks,
    };
  } catch (error) {
    console.error("Books All Error:", error);
    return {
      success: false,
      error: "Error occurred while fetching books",
    };
  }
};

export const createBook = async (data: any) => {
  const { title, coverImg, genre, description, pdfFile, isNewBook } =
    JSON.parse(data);

  try {
    await connectToDB();

    const session = await auth();
    const loggedUser = await User.findOne({ email: session?.user?.email });

    if (!loggedUser) {
      return {
        success: false,
        error: "Access denied | Unauthorized",
      };
    }

    const isUserAuthor = loggedUser.role === "author";

    if (!isUserAuthor) {
      return {
        success: false,
        error: "Only authors can create books",
      };
    }

    await Book.create<IBook>({
      title,
      coverImg,
      genre: genre.toLowerCase(),
      description,
      pdfFile,
      isNewBook: isNewBook,
      authorId: loggedUser._id,
      author: loggedUser.username,
    });

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Create Book Error:", error);
    return {
      success: false,
      error: "Error occurred while creating book",
    };
  }
};

export const getAuthorBooks = async () => {
  try {
    const session = await auth();
    const loggedUser = await User.findOne({ email: session?.user?.email });

    if (!loggedUser) {
      return {
        success: false,
        error: "Access denied | Unauthorized",
      };
    }

    const isUserAuthor = loggedUser.role === "author";

    if (!isUserAuthor) {
      return {
        success: false,
        error: "Only authors can create books",
      };
    }

    await connectToDB();

    const books = await Book.find({ authorId: loggedUser._id }).lean();

    const serializedBooks = (books as unknown as IBook[]).map(
      (book: IBook) => ({
        ...book,
        _id: book._id.toString(),
      })
    );

    return {
      success: true,
      books: serializedBooks,
    };
  } catch (error) {
    console.error("Get Author Books Error:", error);
    return {
      success: false,
      error: "Error occurred while fetching author books",
    };
  }
};

export const deleteBook = async (id: string) => {
  try {
    const session = await auth();
    const loggedUser = await User.findOne({ email: session?.user?.email });

    if (!loggedUser) {
      return {
        success: false,
        error: "Access denied | Unauthorized",
      };
    }

    const isUserAuthor = loggedUser.role === "author";

    if (!isUserAuthor) {
      return {
        success: false,
        error: "Only authors can delete books",
      };
    }

    await connectToDB();

    await Book.findByIdAndDelete(id);

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete Book Error:", error);
    return {
      success: false,
      error: "Error occurred while deleting book",
    };
  }
};

export const getBook = async (id: string) => {
  try {
    await connectToDB();

    const book = await Book.findById(id).lean();

    return {
      success: true,
      book: JSON.parse(JSON.stringify(book)) as IBook,
    };
  } catch (error) {
    console.error("Get Book Error:", error);
    return {
      success: false,
      error: "Error occurred while fetching book",
    };
  }
};

export const updateBook = async (id: string, data: any) => {
  const { title, coverImg, genre, description, pdfFile, isNewBook } = data;

  try {
    const session = await auth();
    const loggedUser = await User.findOne({ email: session?.user?.email });

    if (!loggedUser) {
      return {
        success: false,
        error: "Access denied | Unauthorized",
      };
    }

    const isUserAuthor = loggedUser.role === "author";

    if (!isUserAuthor) {
      return {
        success: false,
        error: "Only authors can update books",
      };
    }

    await connectToDB();

    await Book.findByIdAndUpdate(id, {
      title,
      coverImg,
      genre: genre.toLowerCase(),
      description,
      pdfFile,
      isNewBook,
    }).lean();

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Update Book Error:", error);
    return {
      success: false,
      error: "Error occurred while updating book",
    };
  }
};
