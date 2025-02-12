import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import { LogOut, NotebookPen, SquareUserRound } from "lucide-react";
import { getLetters } from "@/lib/utils";
import User from "@/db/models/_user.model";
import { connectToDB } from "@/db/connection";
import UpdateRole from "./_update-role";

async function UserBox() {
  const user = await auth();

  await connectToDB();

  const res = await User.findOne({ email: user?.user.email });

  return !user ? (
    <Button className="w-fit bg-indigo-400 hover:bg-indigo-500" asChild>
      <Link href={"/sign-in"}>Sign In</Link>
    </Button>
  ) : (
    <div className="flex items-center gap-4">
      {res?.role === "author" ? (
        <Button
          className="w-fit bg-indigo-400 hover:bg-indigo-500"
          size={"default"}
          asChild
        >
          <Link href={"/book/new"}>Publish a Book</Link>
        </Button>
      ) : (
        <UpdateRole role={res?.role} />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            {user && user.user.image ? (
              <AvatarImage src={user?.user.image} alt="@shadcn" />
            ) : (
              <AvatarFallback>{getLetters(user?.user.name)}</AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 mr-4 md:mr-10 mt-2 bg-dark-200 border-none text-white">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-dark-700" />

          {res?.role === "author" && (
            <>
              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2"
                asChild
              >
                <Link href={"/my-books"}>
                  <SquareUserRound size={16} />
                  My Books
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer flex items-center gap-2 mt-2"
                asChild
              >
                <Link href={"/book/new"}>
                  {" "}
                  <NotebookPen size={16} />
                  Publish a Book
                </Link>
              </DropdownMenuItem>
            </>
          )}

          <form
            action={async () => {
              "use server";

              await signOut();
            }}
          >
            <Button
              type="submit"
              className="px-2 bg-transparent hover:bg-transparent focus:bg-transparent"
              size={"sm"}
            >
              <LogOut size={16} className="text-white" />
              Sign Out
            </Button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserBox;
