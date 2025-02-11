import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  feedback: {
    type: Boolean, // ✅ Stores `true` for thumbs up and `false` for thumbs down
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
