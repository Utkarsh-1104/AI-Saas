'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (token) {
      router.push('/resume-match-jd');
    }

  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-center py-10">Welcome to the AI Resume Analyzer</h1>

        </div>
        <div className="mt-6">
          <Link
            href="/login"
            className="inline-block px-6 py-2 border border-black text-black font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
            >
            Get Started 
          </Link>
        </div>
      </div>
  </div>
  );
}
