import { getSession } from "next-auth/react";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  await dbConnect();

  // Check session authentication
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userEmail = session.user.email;

  if (req.method === "GET") {
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { name, email, profileImage, password } = req.body;

      const user = await User.findOneAndUpdate(
        { email: userEmail },
        { name, email, profileImage, ...(password && { password }) },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "Profile updated successfully!" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update profile" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
