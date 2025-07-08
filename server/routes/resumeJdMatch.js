import express from 'express';
import { GoogleGenAI } from "@google/genai";

const router = express.Router()

const ai = new GoogleGenAI({ apiKey: process.env.GENAI_API_KEY });

router.post('/', async (req, res) => {
    const { resumeText, jd } = req.body;  

    try {
        const prompt = `You are a leading resume evaluator. Analyze the candidate's resume against the job description provided and return your response in **valid JSON** with the following format:

        ---

        ### FORMAT
        {
        "strengths": [list of short points explaining what the candidate is good at and why],
        "weaknesses": [list of short points describing gaps based on the JD],
        "match_score": float (between 0 and 1),
        "suggestions_to_improve": [actionable advice to improve the resume and job match],
        "overall_comment": "brief summary of fit"
        }

        ### RULES:
        - Each **strength/weakness point must be 1 sentence** and explain **why** it matters (not just skill names).
        - Use 2-4 points under strengths and weaknesses.
        - **Always give suggestions** unless score is exactly 1.0.
        - Be honest but supportive.
        - Do NOT return empty arrays unless it's truly a perfect match.

        ---

        ### JOB DESCRIPTION:
        ${jd}

        ### RESUME:
        ${resumeText}

        ---

        ### EXAMPLE RESPONSE FORMAT AND STRUCTURE:
        {
            "strengths": [
                "Strong proficiency in React.js for building interactive UIs.",
                "Experience with Node.js and Express for backend development.",
                "Built and deployed personal projects, showing initiative and self-learning.",
                "Familiar with Git and GitHub for version control and collaboration."
            ],
            "weaknesses": [
                "No mention of working in a collaborative or team-based setting.",
                "Lacks experience with cloud platforms like AWS or Vercel for deployment.",
                "Does not showcase familiarity with testing frameworks or CI/CD tools."
            ],
            "match_score": 0.68,
            "suggestions_to_improve": [
                "Include examples of working in a team, such as internships or group projects.",
                "Gain experience deploying apps using cloud services and mention that on your resume.",
                "Add testing or CI/CD knowledge to show readiness for production environments."
            ],
            "overall_comment": "The candidate has solid full-stack skills and shows a proactive attitude through personal projects, but lacks collaboration and deployment experience that are key for this role."
        }

        ---

        Return only valid JSON and nothing else.
        `;


    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    const responseData = response.text;
    const jsonStart = responseData.indexOf('{');
    const jsonEnd = responseData.lastIndexOf('}') + 1;
    const jsonString = responseData.substring(jsonStart, jsonEnd);
    const jsonResponse = JSON.parse(jsonString);
    res.json({
        status: 200,
        message: "Resume analysis completed successfully",
        data: jsonResponse
    })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while analyzing the resume.' });        
    }

})


export default router