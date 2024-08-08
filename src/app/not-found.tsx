"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const ErrorPage: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mr-2">
            <div className="w-8 h-8 bg-black rounded-full animate-ping"></div>
          </div>
          <div className="relative w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center ml-2">
            <div className="w-8 h-8 bg-black rounded-full animate-ping"></div>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-rose-500">Looks like you&apos;re lost</h1>
          <p className="mt-2 text-2xl font-light">404 error</p>
        </div>
        <button
          onClick={handleBackToHome}
          className="mt-6 px-6 py-3 text-lg font-light text-black border border-rose-500 rounded-lg shadow-md hover:bg-rose-500 hover:text-white transition-all duration-300"
          aria-label="back to home"
          title="back to home"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
};

export default ErrorPage;
