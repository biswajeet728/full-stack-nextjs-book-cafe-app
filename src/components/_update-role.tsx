"use client";

import { updateRole } from "@/lib/actions/user.action";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

function UpdateRole({ role }: { role: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <form
      action={() => {
        startTransition(async () => {
          await updateRole();
          router.refresh();
        });
      }}
    >
      <Button
        className="w-fit bg-indigo-400 hover:bg-indigo-500"
        size={"default"}
        disabled={role === "author"}
      >
        {isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Became author"
        )}
      </Button>
    </form>
  );
}

export default UpdateRole;
