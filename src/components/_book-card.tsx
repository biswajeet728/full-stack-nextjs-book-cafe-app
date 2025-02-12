import * as React from "react";

import { Card } from "@/components/ui/card";
import { IBook } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

function BookCard({ book }: { book: IBook }) {
  return (
    <Link href={`/book/${book._id}`}>
      <Card className="border-none bg-transparent w-full h-full flex flex-col">
        <div className="flex flex-row items-start justify-center md:justify-start gap-4">
          {/* Image on the left */}
          <Image
            src={book.coverImg}
            alt={book.title}
            width={1000}
            height={1000}
            className="w-1/2 h-full md:w-40 md:h-60 object-cover rounded-md"
          />
        </div>

        {/* Book details & button in a column layout */}
        <div className="flex flex-col flex-grow items-center md:items-start mt-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="bg-indigo-200 bg-opacity-80 capitalize px-2 py-1 text-xs w-fit">
              {book.genre}
            </div>
            <h1 className="text-lg font-bold text-slate-100 text-opacity-75 mt-2">
              {book.title.length > 30
                ? `${book.title.slice(0, 20)}...`
                : book.title}
            </h1>
            <p className="text-sm text-slate-100 text-opacity-50 mt-1">
              {book.author}
            </p>
          </div>

          {/* Button always at the bottom */}
          <Button
            className="bg-indigo-400 mt-3 hover:bg-indigo-500 w-fit"
            size={"sm"}
          >
            Check This Out
          </Button>
        </div>
      </Card>
    </Link>
  );
}

export default BookCard;
