import { IUser } from "@/types";
import mongoose, { model, models } from "mongoose";

export const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default: null,
  },
  role: {
    type: mongoose.Schema.Types.String,
    default: "user",
  },
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;
