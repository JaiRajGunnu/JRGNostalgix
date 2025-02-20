// pages\api\user.js

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  await dbConnect();

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (req.method === "GET") {
      const user = await User.findById(userId).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });

      // Return the user data in the expected structure
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
        },
      });
    }

    if (req.method === "PUT") {
      const { password } = req.body;
      if (!password) return res.status(400).json({ message: "Password is required" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true }
      ).select("-password");

      // Return the updated user data in the expected structure
      return res.status(200).json({
        message: "Password updated successfully!",
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("API Error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Server error" });
  }
}