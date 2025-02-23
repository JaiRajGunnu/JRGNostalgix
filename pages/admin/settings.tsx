import AdminSidebar from "@/components/ui/AdminSidebar";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useState } from "react";

const ToggleMessage = () => {
  const [show, setShow] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <BackgroundBeamsWithCollision> </BackgroundBeamsWithCollision>
      </div>

      <AdminSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <h1 className="text-2xl font-bold mb-4 text-white">React Test Component</h1>
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        {show ? "Hide" : "Show"} Message
      </button>
      {show && <p className="mt-4 text-lg text-gray-700">Hello, React is working! 🎉</p>}
    </div>
  );
};

export default ToggleMessage;
