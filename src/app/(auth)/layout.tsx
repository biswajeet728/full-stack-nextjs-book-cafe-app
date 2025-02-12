import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen flex">
      <div className="flex-1 hidden lg:flex">
        <Image
          src={"/images/bg.jpg"}
          alt="bg"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="w-full h-full flex-col flex justify-center items-center">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-400 mb-2 tracking-wide">
            Welcome to Book Cafe
          </h1>
          <p className="text-center text-gray-500 text-sm md:text-lg font-semibold mb-4">
            Get your favorite books here or sell your books !
          </p>
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
