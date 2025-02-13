import { auth } from "@/auth";
import BookForm from "@/components/_book-forms";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <section className="h-full flex-grow mb-4 max-w-full md:w-[1000px] mx-auto px-2 md:px-0">
      <h1 className="text-3xl text-white font-semibold mt-4 text-opacity-40">
        Create Book and Start a New Adventure
      </h1>
      <p className="text-white text-opacity-40 mb-4 mt-1">
        Make sure to fill in all the details to create a new book. You can also
        upload a cover image for the book.
      </p>
      <BookForm
        defaultValues={{
          title: "",
          genre: "",
          description: "",
          coverImg: "",
          pdfFile: "",
          isNewBook: false,
        }}
      />
    </section>
  );
}

export default page;
