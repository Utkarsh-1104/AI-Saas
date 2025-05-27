'use client';
import axios from 'axios';
import React, { use } from 'react';

export default function Home() {
  const [resume, setResume] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const response = await axios.post('http://localhost:4000/resume-analyzer', {
      resumeText: resume,
    })

    console.log(response.data);
    setFeedback(response.data.analysis);
    setLoading(false);
    console.log('Resume submitted:', resume);
  };
  return (
    <div className="container mx-auto flex flex-col items-center mt-72 text-center">
      <h1 className="text-4xl font-bold mb-4">Resume Analyzer</h1>
      <p className="text-lg mb-6">
        AI SaaS to analyze resumes and provide feedback
      </p>
      <div className="flex justify-center">
        <form className='flex items-center gap-10' action="">
          <textarea name="" id="" onChange={(e) => {setResume(e.target.value)}} className="h-30 w-96 p-2 border-2 rounded-2xl border-gray-800" placeholder="Paste your resume here"></textarea>
          <button className='bg-amber-300 p-4 px-8 rounded-3xl font-mono text-xl text-black hover:cursor-pointer hover:bg-amber-600' type="submit" onClick={handleSubmit}>Send</button>
        </form>
      </div>
      <div>
        {feedback && (
          <div className="mt-16 p-4 border-2 border-gray-800 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Feedback</h2>
            <p className="text-gray-700">{feedback}</p>    
          </div>   
        )}
        {loading && (
          <div className="mt-6 p-4 border-2 border-gray-800 rounded-lg">
            <p className="text-gray-700">Analyzing your resume...</p>
            <p className='text-gray-600'>It make take 30-60 seconds...</p>
          </div>
        )}
      </div>
    </div>
  );
}
