import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Splash() {
  const [username, setUsername] = useState('Guest');
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setUsername(userEmail); // Display stored user email as a username
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome, {username}!</h1>
    </div>
  );
}
