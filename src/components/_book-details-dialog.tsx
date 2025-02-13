"use client";

import Image from "next/image";
import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { IBookDetails } from "@/types";

function BookDetails({
  bookData,
  setBookData,
  isExpanded,
  setIsExpanded,
}: IBookDetails) {
  return (
    <div className="bg-dark-100 bg-opacity-25 rounded-md p-3 border-none outline-none focus:outline-none hover:outline-none">
      <div className="grid grid-cols-1 md:grid-cols-[25%_auto]">
        <div>
          <Image
            src={bookData?.coverImg! || "https://placehold.co/600x400/png"}
            alt={bookData?.title || "Book Cover"}
            width={1000}
            height={1000}
            className="w-2/3 h-full md:w-44 md:h-full object-cover rounded-md"
          />
        </div>
        <div>
          <DialogHeader className="flex flex-col space-y-1.5 text-left">
            <DialogTitle className="text-white text-xl md:text-3xl font-bold">
              {bookData?.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-50">
              {bookData?.author}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 mt-2">
              <div className="bg-indigo-700 bg-opacity-80 capitalize px-2 py-1 text-xs w-fit text-white rounded-full">
                {bookData?.genre}
              </div>
              {bookData?.isNewBook && (
                <div
                  className="bg-green-500 text-white text-xs px-3 py-1 rounded-full
  "
                >
                  New
                </div>
              )}
            </div>
            <p className="text-sm text-slate-100 text-opacity-50 mt-1">
              {isExpanded
                ? bookData?.description
                : `${bookData?.description.slice(0, 150)}...`}

              {bookData?.description.length! > 150 ? (
                <span
                  className="text-indigo-400 hover:text-indigo-500 cursor-pointer ml-1"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </span>
              ) : null}
            </p>
          </div>

          <Button
            className="bg-indigo-400 mt-3 hover:bg-indigo-500 w-fit"
            size={"sm"}
            onClick={() => window.open(bookData?.pdfFile!, "_blank")}
          >
            Read / Download PDF
          </Button>
        </div>
      </div>
      <DialogFooter className="mt-2 flex items-end justify-end w-full">
        <Button
          className="bg-indigo-400 mt-3 hover:bg-indigo-500 w-fit"
          size={"sm"}
          onClick={() => setBookData(null)}
        >
          Close
        </Button>
      </DialogFooter>
    </div>
  );
}

export default BookDetails;
