"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import axios from "axios"

interface Analysis {
  _id: string
  user: string
  jdText: string
  resumeText: string
  analysis: string
  createdAt: string
  deepAnalysis: string
}


export default function AnalysisDetail() {
  const params = useParams()
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shallowAnalysis, setShallowAnalysis] = useState<any>(null)
  const [deepAnalysis, setDeepAnalysis] = useState<any>(null)

  useEffect(() => {
    const fetchAnalysis = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getanalysis/${params.id}`)
      setAnalysis(res.data.singleAnalysis[0] || null)
      setIsLoading(false)
    }
    fetchAnalysis()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const parseAnalysis = (analysis: string) => {
    try {
      const parsed = JSON.parse(analysis)
      return parsed
    } catch (error) {
      console.error("Error parsing analysis:", error)
      return null
    }
  }

  useEffect(() => {
    if (analysis) {
      const parsed = parseAnalysis(analysis.analysis)
      setShallowAnalysis(parsed)
      const parsedDeep = parseAnalysis(analysis.deepAnalysis)
      setDeepAnalysis(parsedDeep)
    }
  }, [analysis])

  function getKeywordMatchPercentage(): number {
    if (!deepAnalysis) return 0
    const totalKeywords = deepAnalysis.keyword_gap_analysis.missing_keywords.length + deepAnalysis.keyword_gap_analysis.matched_keywords.length
    const matchedKeywords = deepAnalysis.keyword_gap_analysis.matched_keywords.length
    return totalKeywords > 0 ? (matchedKeywords / totalKeywords) * 100 : 0
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
              className="text-xs lg:text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide"
            >
              ← Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">Analysis Details</span>
          </div>
          <Link href="/" className="text-xs lg:text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide">
            Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl lg:text-4xl font-light text-black mb-2 lg:mb-4 tracking-tight">Analysis Details</h1>
          <p className="text-gray-600 text-lg">{formatDate(analysis?.createdAt)}</p>
          <h2 className="text-base lg:xl mt-4 max-w-3xl mx-auto">{analysis?.jdText}</h2>
        </div>

        {/* Match Score */}
        <div className="text-center py-8 mb-12 border-t border-b border-gray-200">
          <div className="inline-flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32 border-2 border-black rounded-full mb-4">
            <span className="lg:text-3xl text-2xl font-light">{shallowAnalysis?.match_score * 100}%</span>
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
              {shallowAnalysis?.strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span className="lg:text-lg text-base text-gray-700 leading-relaxed">{strength}</span>
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
              {shallowAnalysis?.weaknesses.map((weakness: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="lg:text-lg text-base text-gray-700 leading-relaxed">{weakness}</span>
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
              {shallowAnalysis?.suggestions_to_improve.map((suggestion: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span className="lg:text-lg text-base text-gray-700 leading-relaxed">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Overall Comment */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h3 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Overall Assessment</h3>
          <p className="text-gray-700 leading-relaxed lg:text-lg text-base max-w-4xl">{shallowAnalysis?.overall_comment}</p>
        </div>

        {/* Deep Analysis Sections */}
        {deepAnalysis && (
          <div className="space-y-12 my-12 pt-8 border-t border-gray-200">
            {/* Keyword Gap Analysis */}
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-black mb-2 tracking-tight">Keyword Gap Analysis</h2>
                <p className="text-gray-600">Analyze the keywords in your resume vs. the job description</p>
              </div>

              {/* Overall Match Score */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 border-2 border-black rounded-full mb-4">
                    <span className="text-2xl font-light">{getKeywordMatchPercentage().toFixed(2)}%</span>
                  </div>
                  <p className="text-sm text-gray-600 uppercase tracking-wide">Keyword Match</p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 border-2 border-green-600 rounded-full mb-4">
                    <span className="text-2xl font-light text-green-600">{deepAnalysis?.keyword_gap_analysis.matched_keywords.length}</span>
                  </div>
                  <p className="text-sm text-gray-600 uppercase tracking-wide">Matched Keywords</p>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 border-2 border-red-600 rounded-full mb-4">
                    <span className="text-2xl font-light text-red-600">{deepAnalysis?.keyword_gap_analysis.missing_keywords.length}</span>
                  </div>
                  <p className="text-sm text-gray-600 uppercase tracking-wide">Missing Keywords</p>
                </div>
              </div>

              {/* Keyword Lists */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Resume Keywords */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <h3 className="text-lg font-medium text-black uppercase tracking-wide">Resume Keywords</h3>
                    <span className="text-sm text-gray-500">({deepAnalysis?.keyword_gap_analysis.resume_keywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {deepAnalysis?.keyword_gap_analysis.resume_keywords.map((keyword: string) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-yellow-100 text-yellow-900 text-xs rounded border border-yellow-300 uppercase tracking-wide"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job Description Keywords */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <h3 className="text-lg font-medium text-black uppercase tracking-wide">Job Description Keywords</h3>
                    <span className="text-sm text-gray-500">({deepAnalysis?.keyword_gap_analysis.jd_keywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {deepAnalysis?.keyword_gap_analysis.jd_keywords.map((keyword: string) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-blue-100 text-blue-900 text-xs rounded border border-blue-300 uppercase tracking-wide"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Matched Keywords */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <h3 className="text-lg font-medium text-black uppercase tracking-wide">Matched Keywords</h3>
                    <span className="text-sm text-gray-500">({deepAnalysis?.keyword_gap_analysis.matched_keywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {deepAnalysis?.keyword_gap_analysis.matched_keywords.map((keyword: string) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-green-100 text-green-900 text-xs rounded border border-green-300 uppercase tracking-wide"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <h3 className="text-lg font-medium text-black uppercase tracking-wide">Missing Keywords</h3>
                    <span className="text-sm text-gray-500">({deepAnalysis?.keyword_gap_analysis.missing_keywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {deepAnalysis?.keyword_gap_analysis.missing_keywords.slice(0, 15).map((keyword: string) => (
                      <span
                        key={keyword}
                        className="px-3 py-1 bg-red-100 text-red-900 text-xs rounded border border-red-300 uppercase tracking-wide"
                      >
                        {keyword}
                      </span>
                    ))}
                    {deepAnalysis?.keyword_gap_analysis.missing_keywords.length > 15 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-900 text-xs rounded border border-gray-300 uppercase tracking-wide">
                        +{deepAnalysis?.keyword_gap_analysis.missing_keywords.length - 15} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Points */}
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-light text-black mb-2 tracking-tight">Actionable Improvement Points</h2>
                <p className="text-gray-600">Follow these recommendations to strengthen your application</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {deepAnalysis?.ai_resume_suggestions.recommendations.map((point: string, index: any) => (
                  <div key={index} className={`border p-6 text-center bg-red-100 border-red-300 text-red-900`}>
                    <p className="text-sm leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>


              <div className="bg-gray-50 p-8 border border-gray-200 space-y-4">
                <h3 className="text-lg font-medium text-black uppercase tracking-wide">Implementation Tips</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Focus on High Priority items first as they have the most impact on your resume's competitiveness
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Make changes naturally without keyword stuffing, as recruiters can detect artificial language
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Test your updated resume by running a new analysis to see improvement in keyword matching
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">
                      Customize your resume for each application rather than using a one-size-fits-all approach
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}      

        {/* Original Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
              Original Resume
            </h3>
            <div className="bg-gray-50 p-6 border border-gray-200">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                {analysis.resumeText}
              </pre>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
              Job Description
            </h3>
            <div className="bg-gray-50 p-6 border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{analysis.jdText}</p>
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
