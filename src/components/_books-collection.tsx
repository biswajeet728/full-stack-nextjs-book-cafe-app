"use client";

import { IBook } from "@/types";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import BookCard from "./_book-card";

function BookCollection({ books }: { books: IBook[] }) {
  const getAllGenres = [...new Set(books.map((book) => book.genre))];
  const [selectedGenre, setSelectedGenre] = React.useState<string>("");

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genre === selectedGenre)
    : books;

  return (
    <section className="my-5" id="collection">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold text-center md:text-start text-slate-100 text-opacity-55">
            Get Access Our Top Most Collections
          </h1>
        </div>

        <div className="w-full md:w-1/4 text-white">
          <Select
            value={selectedGenre || ""}
            onValueChange={(value) => setSelectedGenre(value)}
          >
            <SelectTrigger className="w-full border border-dark-200">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="w-full bg-dark-100 text-white border border-dark-200">
              <SelectGroup className="p-2">
                <SelectLabel>Select a Genre</SelectLabel>
                {getAllGenres.map((item: string, index: number) => (
                  <SelectItem key={index} value={item} className="capitalize">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-8">
        {filteredBooks.map((book: IBook, index: number) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </section>
  );
}

export default BookCollection;
