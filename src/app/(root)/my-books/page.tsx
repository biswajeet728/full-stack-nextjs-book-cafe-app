import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return <div>page</div>;
}

export default page;
