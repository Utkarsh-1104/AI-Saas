import express from 'express'
import { GoogleGenAI } from "@google/genai";

const router = express.Router()

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

router.post('/', async (req, res) => {
    const { resumeText, jd } = req.body;

    try {
        const prompt = `
            You are an expert career advisor and resume analyst.
            You are analyzing a candidate's RESUME against a JOB DESCRIPTION.  
            Your task is to perform a deep analysis in two parts:  

            ### Part 1: Keyword Gap Analysis  
            - Extract 10-20 important keywords (skills, tools, certifications, technologies) from the RESUME.  
            - Extract 10-20 important keywords from the JOB DESCRIPTION.  
            - Identify keywords that are common (matched) and keywords missing from the resume.  

            ### Part 2: AI Resume Suggestions  
            - Based on the missing keywords and overall JD, suggest **concrete improvements** the candidate can add to their resume without lying or exaggerating skills.  
            - The suggestions must be practical, resume-safe, and realistic (do not invent skills the user doesn't have, e.g., “learn Docker” is okay, but “already worked with Docker” is not).  
            - Provide at least 3-5 suggestions.  

            ### Output Format  
            Return ONLY valid JSON in this exact structure:

            {
                keyword_gap_analysis: {
                    "resume_keywords": [list of keywords from resume that are important],
                    "jd_keywords": [list of keywords from job description that are important],
                    "matched_keywords": [list of keywords present in both resume and JD],
                    "missing_keywords": [list of keywords from JD that are missing or are weak in resume],
                },
                ai_resume_suggestions: {
                    "recommendations": [list of suggestions for improving resume]
                }
            }

            ### Notes  
            - Do not add explanations outside JSON.  
            - Keep keywords short (1-3 words max).  
            - Suggestions must be short actionable bullet points.

            ---
            Now analyze the following data:

            ### JOB DESCRIPTION:
            ${jd}

            ### RESUME:
            ${resumeText}

            ---

            ### EXAMPLE RESPONSE FORMAT AND STRUCTURE:
            {
                "keyword_gap_analysis": {
                    "resume_keywords": ["React", "Node.js", "Express", "MongoDB", "Git"],
                    "jd_keywords": ["React", "Node.js", "Docker", "AWS", "CI/CD"],
                    "matched_keywords": ["React", "Node.js"],
                    "missing_keywords": ["Docker", "AWS", "CI/CD"],
                },
                "ai_resume_suggestions": {
                    "recommendations": [
                        "Highlight any cloud-related learning or coursework (e.g., AWS basics).",
                        "Add projects where Docker was used, or start experimenting with containerization.",
                        "Showcase experience with CI/CD tools (GitHub Actions, Jenkins) if applicable.",
                        "Consider emphasizing backend scalability skills for Node.js apps."
                    ]
                }
            }
        `
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });

        const responseText = response.text;
        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}') + 1;
        const jsonString = responseText.substring(jsonStart, jsonEnd);
        const jsonResponse = JSON.parse(jsonString);
        
        res.json({
            status: 200,
            message: "Deep analysis completed successfully",
            deepAnalysis: jsonResponse
        })
    } catch (error) {
        console.error( error);
        res.status(500).json({ error: "Internal server error during deep analysis." });
    }
})

export default router;