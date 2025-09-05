"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { useUser } from "../context/UserContext"

interface Analysis {
  _id: string
  user: string
  jdText: string
  resumeText: string
  analysis: string
  createdAt: string
}

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
}


export default function Dashboard() {
  const { user } = useUser()
  const [analyses, setAnalyses] = useState<Analysis[]>([])

  useEffect(() => {
    const fetchAnalyses = async () => {

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getanalysis`, {
        userId: user?._id,
      })
      setAnalyses(response.data.analysis)
    }
    fetchAnalyses()
  }, [user])

  const handleDelete = (_id: string) => {
    if (confirm("Are you sure you want to delete this analysis?")) {
      // setAnalyses(analyses?.filter((analysis) => analysis._id !== _id))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  const truncateJobTitle = (title: string) => {
    const words = title.split(" ")
    return words.slice(0, 7).join(" ") + (words.length > 7 ? "..." : "")
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-light text-black tracking-tight">Dashboard</h1>
          <Link href="/" className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-wide">
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
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Name</p>
                    <p className="text-xl ">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-xl ">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Total Analyses</p>
                    <p className="text-xl">{analyses?.length}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/"
                  className="block w-full px-4 py-3 bg-black text-white text-center font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors"
                >
                  New Analysis
                </Link>
                <Link
                  href="/profile"
                  className="block w-full px-4 py-3 border border-black text-black text-center font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
                >
                  Account Settings
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h2 className="text-xl font-medium text-black uppercase tracking-wide">Analysis History</h2>

              {analyses?.length === 0 ? (
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
                  {analyses?.map((analysis: Analysis) => (
                    <div key={analysis._id} className="border border-gray-200 p-4 hover:border-black transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <span className="text-sm text-gray-500 uppercase tracking-wide">
                              {formatDate(analysis.createdAt)}
                            </span>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-black rounded-full"></div>
                              <span className="text-md font-medium">{parseAnalysis(analysis.analysis).match_score * 100}% Match</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-light text-black mb-2">{truncateJobTitle(analysis.jdText)}</h3>
                          <p className="text-md text-gray-600 line-clamp-2">{parseAnalysis(analysis.analysis).overall_comment}</p>
                        </div>
                        <div className="flex flex-col space-y-2 ml-4">
                          <Link
                            href={`/analysis/${analysis._id}`}
                            className="px-3 py-1 text-xs bg-black text-white text-center uppercase tracking-wide hover:bg-gray-800 transition-colors"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDelete(analysis._id)}
                            className="px-3 py-1 text-xs border border-red-500 text-red-500 uppercase tracking-wide hover:bg-red-500 hover:text-white transition-colors"
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
