import { auth } from "@/auth";
import BookCard from "@/components/_book-card";
import { getAuthorBooks } from "@/lib/actions/book.action";
import { IBook } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const books = await getAuthorBooks();

  return (
    <section className="flex-grow mb-4">
      <h1 className="text-3xl text-white font-semibold mt-4 text-opacity-40">
        My Books
      </h1>
      <p className="text-white text-opacity-40 mb-4 mt-1">
        Here are all the books you have created. You can edit or delete them.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
        {(books.books as unknown as IBook[])?.map(
          (book: IBook, index: number) => (
            <BookCard
              key={index}
              book={book}
              userId={session ? session.user?.id : ""}
            />
          )
        )}
      </div>
    </section>
  );
}

export default page;
