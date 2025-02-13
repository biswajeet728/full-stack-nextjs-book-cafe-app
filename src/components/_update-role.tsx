"use client";

import { updateRole } from "@/lib/actions/user.action";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

function UpdateRole({ role }: { role: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initAction = async () => {
    startTransition(async () => {
      const res = await updateRole();

      if (res?.success) {
        toast({
          title: "Success",
          description: "You have successfully became an author.",
        });
      } else {
        toast({
          title: `Error updating role`,
          description: "An error occurred.",
          variant: "destructive",
        });
      }

      router.refresh();
    });
  };

  return (
    <form
      action={() => {
        initAction();
      }}
    >
      {isPending ? (
        <Button
          className="w-fit bg-indigo-400 hover:bg-indigo-500"
          size={"default"}
          disabled
        >
          <Loader2 className="animate-spin" />
          Updating..
        </Button>
      ) : (
        <Button
          className="w-fit bg-indigo-400 hover:bg-indigo-500"
          size={"default"}
          disabled={role === "author"}
        >
          {"Became author"}
        </Button>
      )}
    </form>
  );
}

export default UpdateRole;
