'use client';
import axios from 'axios';
import React, { use } from 'react';
import pdfToText from 'react-pdftotext';

export default function ResumeMatchJD() {
  const [resume, setResume] = React.useState('');
  const [jd, setJD] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  const extractText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files?.[0];
    pdfToText(file).then(text => {
      setResume(text);
    }
    ).catch(error => {
      console.error("Error extracting text from PDF:", error);
      alert("Failed to extract text from the PDF. Please try another file.");
    }
    );

  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const response = await axios.post('http://localhost:4000/resume-analyzer', {
      resumeText: resume,
      jd: jd
    })

    setResult(response.data.data);
    setLoading(false);
  };

  const handleReset = () => {
    setResume("")
    setJD("")
    setResult(null)
  }
  console.log(result)
  return (
     <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-14 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-light text-black mb-4 tracking-tight">AI Resume Analyzer</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get intelligent insights on how well your resume matches the job requirements
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resume Input */}
            <div className="space-y-3">
              <label htmlFor="resume" className="block text-base font-medium text-black uppercase tracking-wide">
                Upload Resume
              </label>
              <input className='border border-gray-300 p-2 w-full' type="file" name="resume" id="resume" accept="application/pdf" onChange={extractText} />
            </div>

            {/* Job Description Input */}
            <div className="space-y-3">
              <label htmlFor="jobDescription" className="block text-base font-medium text-black uppercase tracking-wide">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                value={jd}
                onChange={(e) => setJD(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-50 px-4 py-3 border border-gray-300 focus:border-black focus:outline-none resize-none text-sm leading-relaxed transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !resume.trim() || !jd.trim()}
              className="px-8 py-3 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Analyzing..." : "Analyze Resume"}
            </button>

            {result && (
              <button
                onClick={handleReset}
                className="px-8 py-3 border border-black text-black font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
              >
                Start Over
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-12 h-12 border-2 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 text-sm uppercase tracking-wide">Analyzing your resume...</p>
          </div>
        )}

        {/* Results Section */}
        {result && !isLoading && (
          <div className="space-y-8">
            {/* Match Score */}
            <div className="text-center py-8 border-t border-gray-200">
              <div className="inline-flex items-center justify-center w-24 h-24 border-2 border-black rounded-full mb-4">
                <span className="text-2xl font-light">{result.match_score * 100}%</span>
              </div>
              <h2 className="text-xl font-medium text-black uppercase tracking-wide">Match Score</h2>
            </div>

            {/* Analysis Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Strengths */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-gray-700 leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
                  Areas to Improve
                </h3>
                <ul className="space-y-3">
                  {result.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-gray-700 leading-relaxed">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suggestions */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
                  Suggestions
                </h3>
                <ul className="space-y-3">
                  {result.suggestions_to_improve.map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-base text-gray-700 leading-relaxed">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Overall Comment */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-medium text-black uppercase tracking-wide mb-4">Overall Assessment</h3>
              <p className="text-gray-700 leading-relaxed text-base max-w-3xl">{result.overall_comment}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
