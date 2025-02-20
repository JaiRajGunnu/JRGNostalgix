import { useState } from "react";

const ToggleMessage = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">React Test Component</h1>
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
