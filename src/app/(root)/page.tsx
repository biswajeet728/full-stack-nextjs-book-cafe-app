import { auth } from "@/auth";
import BookCollection from "@/components/_books-collection";
import Hero from "@/components/_hero";
import { getAllBooks } from "@/lib/actions/book.action";
import React from "react";

async function page() {
  const res = await getAllBooks();
  const session = await auth();
  return (
    <React.Fragment>
      <Hero />
      <BookCollection books={res.books!} user={session!} />
    </React.Fragment>
  );
}

export default page;
