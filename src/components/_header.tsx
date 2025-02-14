import Link from "next/link";
import React from "react";
import { MdOutlineBook } from "react-icons/md";
import { RxMagnifyingGlass } from "react-icons/rx";
import SearchBar from "./_search";
import UserBox from "./_user-box";
import Logo from "./_logo";

function Header() {
  return (
    <header className="border-b border-slate-300 mb-4 border-opacity-30">
      <div className="flex items-center justify-between py-3">
        <Logo />

        <div className="hidden md:flex items-center w-1/3 bg-dark-200 bg-opacity-65 shadow-sm rounded-lg outline-none hover:outline-none focus:outline-none border border-dark-200 border-opacity-75 relative h-full">
          <SearchBar />
        </div>

        <UserBox />
      </div>

      <div className="flex md:hidden lg:hidden items-center bg-dark-200 bg-opacity-45 shadow-sm rounded-lg outline-none hover:outline-none focus:outline-none mb-3 relative">
        <SearchBar />
      </div>
    </header>
  );
}

export default Header;
