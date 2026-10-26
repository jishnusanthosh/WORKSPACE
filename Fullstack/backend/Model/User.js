
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
