import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/feedback";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required!" });
      }

      const newFeedback = new Feedback({ name, email, message });
      await newFeedback.save();

      return res.status(201).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
      console.error("Error saving feedback:", error);
      return res.status(500).json({ error: "Something went wrong!" });
    }
  }

  return res.status(405).json({ error: "Method not allowed!" });
}
