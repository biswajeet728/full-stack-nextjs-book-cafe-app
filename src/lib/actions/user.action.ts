"use server";

import { auth, signIn } from "@/auth";
import { connectToDB } from "@/db/connection";
import User from "@/db/models/_user.model";
import { IUser } from "@/types";
import bcrypt from "bcryptjs";

export async function signInNextAuthHandler(
  params: Pick<IUser, "email" | "password">
) {
  const { email, password } = params;

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      return {
        success: false,
        error: res.error,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2), "Test9");
    return {
      success: false,
      error: "Error occurred while signing in",
    };
  }
}

export async function signUpHandler(params: any) {
  const { username, email, password, profileImg } = params;

  try {
    await connectToDB();

    // find user by email
    const user = await User.findOne({ email });

    if (user) {
      return {
        success: false,
        error: "User already exists",
      };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(String(password), 12);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profileImg: profileImg || null,
    });

    await newUser.save();

    await signInNextAuthHandler({ email, password });

    return {
      success: true,
    };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2), "Test11");
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function updateRole() {
  try {
    await connectToDB();

    const authUser = await auth();

    if (!authUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const user = await User.findOne({ email: authUser.user.email });

    await User.findByIdAndUpdate(user?._id, { role: "author" });

    return {
      success: true,
    };
  } catch (error) {
    console.log(JSON.stringify(error, null, 2), "Update Role");
    return {
      success: false,
      error: "Error occurred while updating role",
    };
  }
}
