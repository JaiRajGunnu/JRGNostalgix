// models\User.tsx

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" }, // Default role is "user"
}, { timestamps: true }); // This will automatically add createdAt and updatedAt fields

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
