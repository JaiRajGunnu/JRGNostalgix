import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Splash() {
  const [username, setUsername] = useState("Guest");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("userName"); 
    if (storedName) {
      setUsername(storedName);  // ✅ Display stored name
    }
  }, []);
  

  return (
    <>
      {/* ✅ Set Page Title */}
      <Head>
        <title>Jai Raj's Slam Book</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Jai Raj's Slam Book</h1>
        <h2 className="text-2xl mt-4">Welcome, {username}!</h2> {/* ✅ Display name instead of email */}
      </div>
    </>
  );
}
