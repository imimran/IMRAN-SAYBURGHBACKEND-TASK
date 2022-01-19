import mongoose, { Schema } from "mongoose";

//user model
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    occupation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

export default User;
