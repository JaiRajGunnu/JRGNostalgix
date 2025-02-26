// pages/api/users.ts - Updated to include POST method

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs"; // Make sure this dependency is installed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.find().select("-password"); // Exclude password from the response
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, password, role } = req.body;
      
      // Basic validation
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Create new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        createdAt: new Date()
      });
      
      await newUser.save();
      
      // Return the user without password
      const userResponse = newUser.toObject();
      delete userResponse.password;
      
      return res.status(201).json(userResponse);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    const { role } = req.body;
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      // Protect against deleting the master admin
      const user = await User.findById(id);
      if (user.email === "jairajgsklm@gmail.com") {
        return res.status(403).json({ message: "This user cannot be deleted" });
      }

      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    // Return allowed methods in the header
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ message: "Method not allowed" });
  }
}