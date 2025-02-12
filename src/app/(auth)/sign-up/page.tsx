"use client";

import AuthForms from "@/components/_auth-forms";
import { signUpHandler } from "@/lib/actions/user.action";
import { signUpSchema } from "@/lib/validations";

function page() {
  return (
    <AuthForms
      schema={signUpSchema}
      type="Sign_Up"
      defaultValues={{
        username: "",
        email: "",
        password: "",
        profileImg: undefined,
      }}
      onSubmit={signUpHandler}
    />
  );
}

export default page;
