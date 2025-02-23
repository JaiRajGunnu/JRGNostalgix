// pages/api/users.ts

import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

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
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
} 