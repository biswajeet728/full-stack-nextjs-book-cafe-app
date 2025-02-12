"use client";

import AuthForms from "@/components/_auth-forms";
import { signInNextAuthHandler } from "@/lib/actions/user.action";
import { signInSchema } from "@/lib/validations";

function page() {
  return (
    <AuthForms
      schema={signInSchema}
      type="Sign_In"
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInNextAuthHandler}
    />
  );
}

export default page;
