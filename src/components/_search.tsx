"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { RxMagnifyingGlass } from "react-icons/rx";
import { getAllBooks } from "@/lib/actions/book.action";
import { IBook } from "@/types";
import BookDetails from "./_book-details-dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<IBook[]>([]);
  const [bookData, setBookData] = React.useState<IBook | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const searchBooks = async () => {
    try {
      const res = await getAllBooks(query);
      setBooks(res.books as IBook[]);
    } catch (error) {
      console.log("Books All Error:", error);
    }
  };

  React.useEffect(() => {
    if (query.length > 1) {
      searchBooks();
    }
  }, [query]);

  return (
    <React.Fragment>
      <RxMagnifyingGlass size={18} className="text-gray-300 ml-2" />
      <Input
        placeholder="Search for books..."
        className="outline-none bg-transparent border-none text-[12px] md:text-sm text-slate-300"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Dialog
        open={!!bookData}
        onOpenChange={(isOpen) => !isOpen && setBookData(null)}
      >
        {query && books.length > 0 && (
          <div className="bg-dark-200 bg-opacity-95 absolute w-full top-10 rounded-sm z-10!">
            {books.map((book: IBook, index: number) => (
              <DialogTrigger asChild key={index}>
                <div
                  key={index}
                  className="p-2 border-b border-dark-300 cursor-pointer"
                  onClick={(e) => {
                    setBookData(book);
                    setBooks([]);
                    setQuery("");
                  }}
                >
                  <p className="text-white text-[12px] md:text-sm">
                    {book.title}
                  </p>
                  <small className="text-xs md:text-sm text-slate-100 mt-2 inline-block opacity-65">
                    <span className="text-slate-100 opacity-65">Author:</span>{" "}
                    {book.author}
                  </small>
                </div>
              </DialogTrigger>
            ))}
          </div>
        )}
        <DialogContent className="w-full max-w-[calc(100%-32px)] md:max-w-[800px] p-2 bg-dark-200 border-dark-200">
          <VisuallyHidden>
            <DialogTitle>Check This Out</DialogTitle>
          </VisuallyHidden>

          <BookDetails
            bookData={bookData}
            setBookData={setBookData}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default SearchBar;
