import Link from "next/link";
import React from "react";
import { MdOutlineBook } from "react-icons/md";

function Logo() {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <MdOutlineBook size={24} className="text-indigo-500" />
      <h2 className="text-indigo-400 text-lg tracking-wider">Book Cafe</h2>
    </Link>
  );
}

export default Logo;
