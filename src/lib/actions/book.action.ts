"use server";

import { connectToDB } from "@/db/connection";
import Book from "@/db/models/_book.model";
import dummyBooks from "./../../../book-data.json";
import { IBook } from "@/types";

export const seedBooks = async () => {
  try {
    await connectToDB();

    // Seed books
    const res = await Book.insertMany(dummyBooks);

    console.log(res, "Books");

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
  console.log("Query:", query);
  try {
    await connectToDB();

    let books = []; // ✅ Convert to plain JSON

    if (query) {
      books = await Book.find({
        title: { $regex: query, $options: "i" },
      }).lean();
    } else {
      books = await Book.find({}).lean();
    }

    // 🔥 Ensure `_id` is a string and remove potential Mongoose metadata
    const serializedBooks = (books as unknown as IBook[]).map(
      (book: IBook) => ({
        ...book,
        _id: book._id.toString(),
      })
    );

    return {
      success: true,
      books: serializedBooks, // ✅ Now it's fully serializable
    };
  } catch (error) {
    console.error("Books All Error:", error);
    return {
      success: false,
      error: "Error occurred while fetching books",
    };
  }
};
