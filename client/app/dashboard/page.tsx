"use client"

import { useState } from "react"
import Link from "next/link"

interface Analysis {
  id: string
  date: string
  jobTitle: string
  matchScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  overallComment: string
}

const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  joinDate: "January 2024",
  totalAnalyses: 12,
}

const mockAnalyses: Analysis[] = [
  {
    id: "1",
    date: "2024-01-15",
    jobTitle: "Senior Software Engineer at Google Inc",
    matchScore: 85,
    strengths: ["Strong technical skills", "Excellent problem-solving", "Team leadership experience"],
    weaknesses: ["Limited cloud experience", "Missing certifications"],
    suggestions: ["Get AWS certification", "Add more metrics"],
    overallComment: "Strong candidate with solid technical foundation...",
  },
  {
    id: "2",
    date: "2024-01-12",
    jobTitle: "Frontend Developer Position at Meta Corp",
    matchScore: 72,
    strengths: ["React expertise", "UI/UX knowledge", "Portfolio projects"],
    weaknesses: ["Limited backend experience", "No TypeScript mentioned"],
    suggestions: ["Learn Node.js", "Add TypeScript projects"],
    overallComment: "Good frontend skills but needs backend knowledge...",
  },
  {
    id: "3",
    date: "2024-01-10",
    jobTitle: "Full Stack Developer Role at Startup",
    matchScore: 91,
    strengths: ["Full stack experience", "Startup mindset", "Quick learner"],
    weaknesses: ["Limited enterprise experience"],
    suggestions: ["Highlight scalability projects"],
    overallComment: "Excellent fit for startup environment...",
  },
  {
    id: "4",
    date: "2024-01-08",
    jobTitle: "DevOps Engineer at Amazon Web Services",
    matchScore: 68,
    strengths: ["CI/CD knowledge", "Docker experience"],
    weaknesses: ["Limited AWS experience", "No Kubernetes"],
    suggestions: ["Get AWS certifications", "Learn Kubernetes"],
    overallComment: "Good foundation but needs more cloud expertise...",
  },
]

export default function Dashboard() {
  const [analyses, setAnalyses] = useState<Analysis[]>(mockAnalyses)
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this analysis?")) {
      setAnalyses(analyses.filter((analysis) => analysis.id !== id))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const truncateJobTitle = (title: string) => {
    const words = title.split(" ")
    return words.slice(0, 7).join(" ") + (words.length > 7 ? "..." : "")
  }

  if (selectedAnalysis) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setSelectedAnalysis(null)}
              className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide"
            >
              ← Back to Dashboard
            </button>
            <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide">
              Home
            </Link>
          </div>

          {/* Analysis Details */}
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-light text-black mb-2 tracking-tight">Analysis Details</h1>
              <p className="text-gray-600">{formatDate(selectedAnalysis.date)}</p>
              <p className="text-lg font-medium mt-2">{selectedAnalysis.jobTitle}</p>
            </div>

            {/* Match Score */}
            <div className="text-center py-8 border-t border-gray-200">
              <div className="inline-flex items-center justify-center w-24 h-24 border-2 border-black rounded-full mb-4">
                <span className="text-2xl font-light">{selectedAnalysis.matchScore}%</span>
              </div>
              <h2 className="text-xl font-medium text-black uppercase tracking-wide">Match Score</h2>
            </div>

            {/* Analysis Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Strengths */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-black uppercase tracking-wide border-b border-gray-200 pb-2">
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {selectedAnalysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
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
                <ul className="space-y-3">
                  {selectedAnalysis.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
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
                <ul className="space-y-3">
                  {selectedAnalysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700 leading-relaxed">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Overall Comment */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-black uppercase tracking-wide mb-4">Overall Assessment</h3>
              <p className="text-gray-700 leading-relaxed max-w-3xl">{selectedAnalysis.overallComment}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-light text-black tracking-tight">Dashboard</h1>
          <Link href="/resume-match-jd" className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide">
            ← Back to Analyzer
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Details */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="border border-gray-200 p-6">
                <h2 className="text-xl font-medium text-black uppercase tracking-wide mb-6">Profile</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
                    <p className="text-lg font-light">
                      {mockUser.firstName} {mockUser.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-sm text-gray-700">{mockUser.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Member Since</p>
                    <p className="text-sm text-gray-700">{mockUser.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Total Analyses</p>
                    <p className="text-2xl font-light">{analyses.length}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block w-full px-4 py-3 bg-black text-white text-center font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors"
                >
                  New Analysis
                </Link>
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 border border-black text-black text-center font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
                >
                  Account Settings
                </Link>
              </div>
            </div>
          </div>

          {/* Analysis History */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-black uppercase tracking-wide">Analysis History</h2>

              {analyses.length === 0 ? (
                <div className="text-center py-12 border border-gray-200">
                  <p className="text-gray-500 mb-4">No analyses yet</p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-2 bg-black text-white font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors"
                  >
                    Create Your First Analysis
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyses.map((analysis) => (
                    <div key={analysis.id} className="border border-gray-200 p-4 hover:border-black transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="text-xs text-gray-500 uppercase tracking-wide">
                              {formatDate(analysis.date)}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-black rounded-full"></div>
                              <span className="text-sm font-medium">{analysis.matchScore}% Match</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-light text-black mb-2">{truncateJobTitle(analysis.jobTitle)}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{analysis.overallComment}</p>
                        </div>
                        <div className="flex flex-col space-y-2 ml-4">
                          <button
                            onClick={() => setSelectedAnalysis(analysis)}
                            className="px-3 py-1 text-xs bg-black text-white uppercase tracking-wide hover:bg-gray-800 transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(analysis.id)}
                            className="px-3 py-1 text-xs border border-red-500 text-red-500 uppercase tracking-wide hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
