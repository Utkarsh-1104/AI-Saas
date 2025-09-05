import express from 'express';
import Analysis from "../schema/analysisSchema.js";
import db from "../db/db.js"

const router = express.Router()

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        await db()

        await Analysis.deleteOne({_id: id})
        res.json({
            status: 200,
            msg: "Analysis deleted successfully"
        })
    } catch (error) {
        res.json({
            status: 500,
            msg: error.message
        })
    }
})

export default router