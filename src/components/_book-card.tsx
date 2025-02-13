"use client";

import * as React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Card } from "@/components/ui/card";
import { IBook } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import BookDetails from "./_book-details-dialog";
import { LucideNotebookPen, Trash } from "lucide-react";
import { deleteBook } from "@/lib/actions/book.action";

function BookCard({ book, userId }: { book: IBook; userId?: string }) {
  const [bookData, setBookData] = React.useState<IBook | null>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card className="border-none bg-transparent w-full h-full flex flex-col relative">
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
          <div className="flex items-center gap-2">
            <div className="bg-indigo-700 bg-opacity-80 capitalize px-2 py-1 text-xs w-fit text-white rounded-full">
              {book.genre}
            </div>
            {book.isNewBook && (
              <div
                className="bg-green-500 text-white text-xs px-3 py-1 rounded-full
            "
              >
                New
              </div>
            )}
          </div>
          <h1 className="text-lg font-bold text-slate-100 text-opacity-75 mt-2">
            {book.title.length > 25
              ? `${book.title.slice(0, 25)}...`
              : book.title}
          </h1>
          <p className="text-sm text-slate-100 text-opacity-50 mt-1 mb-2">
            {book.author}
          </p>
        </div>

        {/* Button always at the bottom */}

        <Dialog
          open={!!bookData}
          onOpenChange={(isOpen) => !isOpen && setBookData(null)}
        >
          <DialogTrigger asChild>
            <Button
              className="bg-indigo-400 mt-auto hover:bg-indigo-500 w-fit"
              size={"sm"}
              onClick={() => setBookData(book)}
            >
              Check This Out
            </Button>
          </DialogTrigger>
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
      </div>

      {userId === book.authorId && (
        <div>
          <div className="absolute top-0 right-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent hover:bg-transparent border-green-500"
            >
              <LucideNotebookPen size={22} className="text-green-500" />
            </Button>
          </div>
          <div className="absolute top-12 right-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-transparent hover:bg-transparent border-red-500"
              onClick={async () => {
                await deleteBook(book._id);
              }}
            >
              <Trash size={22} className="text-red-500" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default BookCard;
