"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Analysis {
  id: string
  date: string
  jobTitle: string
  matchScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  overallComment: string
  resume: string
  jobDescription: string
}


export default function AnalysisDetail() {
  const params = useParams()
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch analysis by ID
    const fetchAnalysis = () => {
      const foundAnalysis = mockAnalyses.find((a) => a.id === params.id)
      setTimeout(() => {
        setAnalysis(foundAnalysis || null)
        setIsLoading(false)
      }, 500)
    }

    fetchAnalysis()
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 text-sm uppercase tracking-wide">Loading analysis...</p>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-black mb-4">Analysis Not Found</h1>
          <p className="text-gray-600 mb-6">The analysis you're looking for doesn't exist.</p>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-2 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide"
            >
              ← Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm text-gray-500 uppercase tracking-wide">Analysis Details</span>
          </div>
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide">
            Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-black mb-4 tracking-tight">Analysis Details</h1>
          <p className="text-gray-600 text-lg">{formatDate(analysis.date)}</p>
          <h2 className="text-xl font-medium mt-4 max-w-3xl mx-auto">{analysis.jobTitle}</h2>
        </div>

        {/* Match Score */}
        <div className="text-center py-8 mb-12 border-t border-b border-gray-200">
          <div className="inline-flex items-center justify-center w-32 h-32 border-2 border-black rounded-full mb-4">
            <span className="text-3xl font-light">{analysis.matchScore}%</span>
          </div>
          <h3 className="text-xl font-medium text-black uppercase tracking-wide">Match Score</h3>
        </div>

        {/* Analysis Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Strengths */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
              Strengths
            </h3>
            <ul className="space-y-4">
              {analysis.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 leading-relaxed">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
              Areas to Improve
            </h3>
            <ul className="space-y-4">
              {analysis.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 leading-relaxed">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
              Suggestions
            </h3>
            <ul className="space-y-4">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 leading-relaxed">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Overall Comment */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h3 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Overall Assessment</h3>
          <p className="text-gray-700 leading-relaxed text-lg max-w-4xl">{analysis.overallComment}</p>
        </div>

        {/* Original Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
              Original Resume
            </h3>
            <div className="bg-gray-50 p-6 border border-gray-200">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                {analysis.resume}
              </pre>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
              Job Description
            </h3>
            <div className="bg-gray-50 p-6 border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{analysis.jobDescription}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors text-center"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/"
            className="px-8 py-3 border border-black text-black font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors text-center"
          >
            New Analysis
          </Link>
        </div>
      </div>
    </div>
  )
}
