import express from 'express';
import Analysis from "../schema/analysisSchema.js";
import db from "../db/db.js"

const router = express.Router()

router.post('/', async (req, res) => {
    const { userId } = req.body;

    try {
        await db()

        const analysis = await Analysis.find({user: userId}).sort({createdAt: -1})

        res.json({
            status: 200, 
            analysis: analysis
        })
    } catch (error) {
        res.json({
            status: 500,
            msg: error.message
        })
    }
})


router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        await db()

        const singleAnalysis = await Analysis.find({_id: id})

        res.json({
            status: 200,
            singleAnalysis
        })
    } catch (error) {
        res.json({
            status: 500,
            msg: error.message
        })
    }
})

export default router