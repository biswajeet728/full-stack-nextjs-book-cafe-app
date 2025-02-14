"use client";

import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import ImageUpload from "./_image-upload";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { createBook, getBook, updateBook } from "@/lib/actions/book.action";
import Image from "next/image";

interface BookFormProp<T extends FieldValues> {
  defaultValues: T;
  bookId?: string;
}

function BookForm<T extends FieldValues>({
  defaultValues,
  bookId,
}: BookFormProp<T>) {
  const router = useRouter();

  const form = useForm<T>({
    resolver: zodResolver(bookSchema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  React.useEffect(() => {
    if (!!bookId) {
      const getBookData = async () => {
        const book = await getBook(bookId);

        if (book?.book) {
          form.reset(book.book as unknown as T);
        }
      };
      getBookData();
    }
  }, [bookId]);

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = !!bookId
      ? await updateBook(bookId, data)
      : await createBook(JSON.stringify(data));

    if (result.success) {
      toast({
        title: "Success",
        description: "You have successfully created a new book.",
      });

      form.reset();

      router.push("/");
    } else {
      toast({
        title: `Error creating book`,
        description: result.error ?? "An error occurred.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="bg-dark-200 bg-opacity-55 shadow-md p-2">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col md:flex-row items-start gap-3">
          <div className="flex-1 w-full">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <div className="bg-dark-200 bg-opacity-85 mt-2 rounded-md">
              <Input
                id="title"
                type="text"
                className="w-full text-white border-none"
                placeholder="Enter book title"
                {...form.register("title" as Path<T>)}
              />
            </div>

            {form.formState.errors.title && (
              <span className="text-red-500 mt-2 inline-block">
                {form.formState.errors.title?.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex-1 w-full">
            <Label htmlFor="genre" className="text-white">
              Genre
            </Label>
            <div className="bg-dark-200 bg-opacity-85 mt-2 rounded-md">
              <Input
                id="genre"
                type="text"
                className="w-full text-white border-none"
                placeholder="Enter book genre"
                {...form.register("genre" as Path<T>)}
              />
            </div>

            {form.formState.errors.genre && (
              <span className="text-red-500 mt-2 inline-block">
                {form.formState.errors.genre?.message?.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-3 mt-3">
          <div className="flex-1 w-full">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <div className="bg-dark-200 bg-opacity-85 mt-2 rounded-md">
              <Textarea
                id="description"
                className="w-full text-white border-none"
                placeholder="Enter book description"
                {...form.register("description" as Path<T>)}
              />
            </div>

            {form.formState.errors.description && (
              <span className="text-red-500 mt-2 inline-block">
                {form.formState.errors.description?.message?.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-3 mt-3">
          <div className="flex-1 w-full">
            <Label htmlFor="cover-image" className="text-white">
              Book Cover Image
            </Label>
            <div className="bg-dark-200 bg-opacity-85 mt-2">
              <ImageUpload
                formKey={"book_cover"}
                type={"Create_Book"}
                accept="image/*"
                folder="books"
                placeHolder="Upload Book Cover Image"
                onValueChange={(value) => {
                  form.setValue(
                    "coverImg" as Path<T>,
                    value as unknown as T["coverImg"]
                  );
                }}
                isEditing={!!bookId}
              />
            </div>

            {form.watch("coverImg" as Path<T>) && (
              <Image
                src={form.watch("coverImg" as Path<T>)}
                alt="cover image"
                width={100}
                height={100}
                className="mt-2"
              />
            )}

            {form.formState.errors.coverImg && (
              <span className="text-red-500 mt-2 inline-block">
                {form.formState.errors.coverImg?.message?.toString()}
              </span>
            )}
          </div>
          <div className="flex-1 w-full">
            <Label htmlFor="book-pdf" className="text-white">
              Book PDF
            </Label>
            <div className="bg-dark-200 bg-opacity-85 mt-2">
              <ImageUpload
                formKey={"book_pdf"}
                type={"Create_Book"}
                accept="application/pdf"
                folder="books/pdfs"
                placeHolder="Upload Book PDF"
                onValueChange={(value) => {
                  form.setValue(
                    "pdfFile" as Path<T>,
                    value as unknown as T["pdfFile"]
                  );
                }}
                isEditing={!!bookId}
              />
            </div>

            {!!bookId && form.watch("pdfFile" as Path<T>) && (
              <a
                className="text-white mt-2 inline-block"
                download
                target="_blank"
                href={form.watch("pdfFile" as Path<T>)} // ✅ Add download link
              >
                See PDF
              </a>
            )}

            {form.formState.errors.pdfFile && (
              <span className="text-red-500 mt-2 inline-block">
                {form.formState.errors.pdfFile?.message?.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Label htmlFor="isNewBok" className="text-white text-base">
            Is New Book?
          </Label>

          <Checkbox
            id="isNewBook"
            className="text-white bg-dark-100 border border-slate-50"
            checked={form.watch("isNewBook" as Path<T>)}
            onCheckedChange={(value) => {
              form.setValue(
                "isNewBook" as Path<T>,
                value as unknown as T["isNewBook"]
              );
            }}
          />
        </div>

        <Button
          className="mt-4 bg-indigo-400 hover:bg-indigo-500"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Plase Wait..."
            : !!bookId
            ? "Update Book"
            : "Create Book"}
        </Button>
      </form>
    </div>
  );
}

export default BookForm;
