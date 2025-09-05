import express from 'express'
import User from '../schema/userSchema.js'
import db from '../db/db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    await db()
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) return res.status(404).json({ msg: 'User not found' })
        res.json({ user: user })
    } catch (error) {
        res.json({
            status: 500,
            msg: error.message
        })
    }
})

export default router