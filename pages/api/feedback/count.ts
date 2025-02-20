import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/feedback";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const count = await Feedback.countDocuments(); // Get the count of feedback documents
      return res.status(200).json({ count });
    } catch (error) {
      console.error("Error fetching feedback count:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
} 