import express from 'express';
import Analysis from '../schema/analysisSchema.js';
import db from '../db/db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { user, jdText, resumeText, analysis } = req.body;
    console.log(user, analysis);

    if (!user || !jdText || !resumeText || !analysis) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        await db();
        const strAnalysis = JSON.stringify(analysis);
        const newAnalysis = new Analysis({
            user,
            jdText,
            resumeText,
            analysis: strAnalysis
        });

        await newAnalysis.save();
        res.status(201).json({ message: 'Analysis saved successfully', data: newAnalysis });
    } catch (error) {
        console.error('Error saving analysis:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;