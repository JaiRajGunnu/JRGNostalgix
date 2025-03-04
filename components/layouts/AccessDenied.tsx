import React from 'react';
import { useRouter } from 'next/router';
import { TbLockFilled } from "react-icons/tb";
interface AccessDeniedProps {
  message?: string;
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ 
  message = "Access restricted. You don't have permission to view this content." 
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#18191af7] p-10 rounded-xl max-w-md w-full text-center shadow-xl m-5">
        <div className="flex justify-center mb-6">
          <div className="bg-red-600/20 p-5 rounded-full border border-red-500/30">
          <TbLockFilled  className="text-red-500 text-7xl" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-3">Access Denied</h1>
        <p className="text-gray-400 mb-8 text-md font-poppins">{message}</p>
        
        <div className="flex flex-col space-y-4">
          <button 
            onClick={() => router.push('/')}
            className="bg-white hover:opacity-75 text-black font-poppins
            font-semibold py-2 px-4 rounded-lg transition-colors"
          >  Go to Home
          </button>
          
          <button 
            onClick={() => router.back()}
            className="bg-black border-gray-700 hover:opacity-75 text-white
            font-poppins font-semibold py-2 px-4 rounded-lg transition-colors"
          >  Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;