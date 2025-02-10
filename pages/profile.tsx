"use client";
import { signOut, useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return <p className="text-center mt-10 text-red-500">Not logged in.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Welcome, {session.user?.name}!</h1>
      <p>Email: {session.user?.email}</p>
      {session.user?.image && (
        <img src={session.user.image} alt="Profile" className="w-20 h-20 rounded-full mt-4" />
      )}
      <button
        onClick={() => signOut()}
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md"
      >
        Sign Out
      </button>
    </div>
  );
}
