import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: 'Hello from server!' });
})


app.post('/resume-analyzer', async (req, res) => {
    const { resumeText } = req.body;  

    console.log(resumeText)
    
    try {
        const prompt =  `You are an expert career coach. Analyze this resume and give:
    1. Three strengths
    2. Two weaknesses
    3. Overall impression in 2 lines
    
    Resume:
    ${resumeText}`;


    const ollamaResponse = await axios.post("http://localhost:11434/api/generate", {
        model: "qwen:7b",
        prompt: prompt,
        stream: false,
    })
    console.log(ollamaResponse)
    res.json({
        analysis: ollamaResponse.data.response
    })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while analyzing the resume.' });        
    }

})


app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
})