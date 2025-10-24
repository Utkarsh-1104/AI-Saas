"use client"
import React from 'react';
interface DeepAnalysisSectionProps {
  deepResult: any
}

export function DeepAnalysisSection({ deepResult }: DeepAnalysisSectionProps) {
  const [deepAnalysis, setDeepAnalysis] = React.useState<any>(deepResult);

  function getKeywordMatchPercentage(): number {
    if (!deepAnalysis) return 0
    const totalKeywords = deepAnalysis.keyword_gap_analysis.missing_keywords.length + deepAnalysis.keyword_gap_analysis.matched_keywords.length
    const matchedKeywords = deepAnalysis.keyword_gap_analysis.matched_keywords.length
    return totalKeywords > 0 ? (matchedKeywords / totalKeywords) * 100 : 0
  }


  return (
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
  )
}
