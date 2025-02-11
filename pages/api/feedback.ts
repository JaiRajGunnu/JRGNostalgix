import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Feedback from "@/models/feedback";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await dbConnect();

    const { feedbackType } = req.body;
    const feedbackValue = feedbackType === "thumbs_up"; // ✅ Store as `true` (👍) or `false` (👎)

    // ✅ Insert feedback into MongoDB
    await Feedback.create({ feedback: feedbackValue });

    return res.status(201).json({ success: true, message: "Feedback stored successfully!" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
