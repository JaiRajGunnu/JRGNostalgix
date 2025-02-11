"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SidebarLayout from "@/components/layouts/sidebarlayout";
import Head from "next/head";

const FeedbackPage = () => {
  const [loading, setLoading] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<"thumbs_up" | "thumbs_down" | null>(null);

  const sendFeedback = async (feedbackType: "thumbs_up" | "thumbs_down") => {
    if (selectedFeedback) return; // Prevent multiple feedback submissions

    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedbackType }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "Submission failed.");
        return;
      }

      toast.success("Feedback submitted!");
      setFeedbackSubmitted(true);
      setSelectedFeedback(feedbackType);

      setTimeout(() => {
        setFeedbackSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Jai Raj's Slam Book</title>
      </Head>

      <SidebarLayout>
        <BackgroundBeamsWithCollision className="p-[5%] flex flex-col justify-center items-center w-full">
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-white">
              How was your experience?
            </h2>
            <div className="flex space-x-7">
              <button
                onClick={() => sendFeedback("thumbs_up")}
                className={`text-7xl transition-all ${
                  selectedFeedback === "thumbs_down" ? "opacity-30" : ""
                } ${selectedFeedback ? "cursor-default" : "hover:scale-110"}`}
                disabled={loading || selectedFeedback !== null}
              >
                👍
              </button>
              <button
                onClick={() => sendFeedback("thumbs_down")}
                className={`text-7xl transition-all ${
                  selectedFeedback === "thumbs_up" ? "opacity-30" : ""
                } ${selectedFeedback ? "cursor-default" : "hover:scale-110"}`}
                disabled={loading || selectedFeedback !== null}
              >
                👎
              </button>
            </div>
          </div>

          {/* ✅ Floating Message */}
          {feedbackSubmitted && (
            <div className="fixed bottom-5 right-5 bg-[#262626] text-white px-5 py-3 rounded-lg shadow-lg opacity-100 transition-opacity animate-fadeIn">
              Thanks for your feedback. 😊
            </div>
          )}
        </BackgroundBeamsWithCollision>
      </SidebarLayout>
    </>
  );
};

export default FeedbackPage;
