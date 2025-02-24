// models\User.tsx

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { 
    type: String, 
    enum: ['user', 'admin'],
    default: "user"
  },
  isRestricted: { 
    type: Boolean, 
    default: false,
    required: true
  },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true }); // This will automatically add createdAt and updatedAt fields

export default mongoose.models.User || mongoose.model("User", UserSchema);