import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row flex-grow mb-3 items-center gap-4 md:gap-0">
      <div className="flex-1">
        <h1 className="text-3xl md:text-5xl font-bold text-center md:text-start text-slate-100 text-opacity-55">
          Welcome to Book Cafe
        </h1>
        <div
          className="text-center md:text-start text-indigo-300 mt-3 text-sm md:text-base w-full md:w-3/4"
          style={{
            lineHeight: "1.8",
          }}
        >
          Discover a cozy corner for book lovers—a place to explore new stories,
          share insights, and connect with fellow readers. Whether you're
          searching for your next favorite book or engaging in meaningful
          discussions, Book Cafe is where ideas come to life.
        </div>

        <Button
          className="mt-5 bg-indigo-500 hover:bg-indigo-500
        w-full md:w-auto
        "
        >
          See Collections
        </Button>
      </div>
      <div className="flex flex-1 justify-center h-full">
        <Image
          src={"/images/book-main.jpg"}
          alt="Book Main"
          width={500}
          height={500}
          className="object-cover"
        />
      </div>
    </section>
  );
}

export default Hero;
