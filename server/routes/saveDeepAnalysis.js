import express from 'express';
import Analysis from '../schema/analysisSchema.js';
import db from '../db/db.js';

const router = express.Router();

router.patch('/', async (req, res) => {
    const { analysisId, deepAnalysis } = req.body;

    if (!analysisId || !deepAnalysis) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        await db();
        const analysisRecord = await Analysis.findById(analysisId);
        if (!analysisRecord) {
            return res.status(404).json({ message: 'Analysis record not found' });
        }
        analysisRecord.deepAnalysis = JSON.stringify(deepAnalysis);
        await analysisRecord.save();
        res.status(200).json({ message: 'Deep analysis saved successfully' });
    } catch (error) {
        console.error('Error saving deep analysis:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;