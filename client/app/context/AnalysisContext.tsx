// AnalysisContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

interface Analysis {
  _id: string;
  match_score: number;
  strengths: string[];
  weaknesses: string[];
}

const AnalysisContext = createContext<any>(null);

export const AnalysisProvider = ({ children }: { children: React.ReactNode }) => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);

  return (
    <AnalysisContext.Provider value={{ analyses, setAnalyses }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalyses = () => useContext(AnalysisContext);
