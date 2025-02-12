import BookCollection from "@/components/_books-collection";
import Hero from "@/components/_hero";
import { getAllBooks } from "@/lib/actions/book.action";
import React from "react";

async function page() {
  const res = await getAllBooks();
  return (
    <React.Fragment>
      <Hero />
      <BookCollection books={res.books!} />
    </React.Fragment>
  );
}

export default page;
