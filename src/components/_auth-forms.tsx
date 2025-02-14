"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ZodType } from "zod";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ImageUpload from "./_image-upload";
import { toast } from "@/hooks/use-toast";

interface AuthFromProps<T extends FieldValues> {
  defaultValues: T;
  type: "Sign_In" | "Sign_Up";
  schema: ZodType<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
}

const AuthForms = <T extends FieldValues>({
  defaultValues,
  type,
  schema,
  onSubmit,
}: AuthFromProps<T>) => {
  const router = useRouter();

  const isSignIn = type === "Sign_In";

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      });

      form.reset();

      router.push("/");
    } else {
      toast({
        title: `Error ${isSignIn ? "signing in" : "signing up"}`,
        description: result.error ?? "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-full md:max-w-lg mx-auto px-4 md:px-0">
      <form className="p-2" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-3 items-center justify-center">
          {Object.keys(defaultValues).map((key) => {
            return (
              <React.Fragment key={key}>
                <div
                  className="bg-dark-200 bg-opacity-45 p-2 rounded-lg w-full"
                  key={key}
                >
                  <Input
                    key={key}
                    type={key === "password" ? "password" : "text"}
                    placeholder={key}
                    className={cn(
                      "w-full outline-none bg-transparent border-none text-white placeholder:capitalize",
                      {
                        hidden: key === "profileImg",
                      }
                    )}
                    {...form.register(key as Path<T>)}
                  />

                  {type === "Sign_Up" && key === "profileImg" && (
                    <ImageUpload
                      formKey={key}
                      type={type}
                      accept="image/*"
                      folder="users"
                      onValueChange={(value) => {
                        form.setValue(
                          key as Path<T>,
                          value as unknown as T[keyof T]
                        );
                      }}
                    />
                  )}
                </div>
                <div className="w-full">
                  {form.formState.errors[key] ? (
                    <p className="text-red-500 text-sm">
                      {typeof form.formState.errors[key]?.message ===
                        "string" && form.formState.errors[key]?.message}
                    </p>
                  ) : null}
                </div>
              </React.Fragment>
            );
          })}

          <Button
            className="w-full md:w-1/4 bg-indigo-400 mt-2 hover:bg-indigo-500"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </form>

      <p className="text-center text-base font-medium text-white mt-4">
        {isSignIn ? "New to Book Cafe? " : "Already have an account? "}

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-slate-500 tracking-wide"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForms;
