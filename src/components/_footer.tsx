import React from "react";
import Logo from "./_logo";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="container mx-auto mb-3">
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-0">
        <Logo />

        <span className="text-base text-gray-200">
          Developed by <strong>Biswajeet Dash</strong> |{" "}
          {new Date().getFullYear()}
        </span>

        <div className="flex items-center gap-6">
          <Link href="https://github.com/biswajeet728" target="_blank">
            <FaGithub
              size={26}
              className="text-gray-200 hover:text-gray-300 cursor-pointer"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/dash-biswajeet408"
            target="_blank"
          >
            <FaLinkedin
              size={26}
              className="text-gray-200 hover:text-gray-300 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
