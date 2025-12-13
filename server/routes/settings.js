import express from 'express';
import db from '../db/db.js';
import User from '../schema/userSchema.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.patch('/', async (req, res) => {
    try {
        await db()

        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password are required" });
        }

        const user = await User.find({ email: email });
        if (user.length === 0) {
            return res.status(400).json({ message: "User does not exist" });
        }

        bcrypt.hash(newPassword, 10, async function(err, hash) {
            if (err) {
                return res.json({ status: 500, message: "Internal server error" });
            }
            user[0].password = hash;
            await user[0].save();
        })  


        res.json({ 
            status: 200,
            message: "Password updated successfully" 
        });

    } catch (error) {
        res.json({ status: 500, message: "Internal server error" });
    }
})

export default router;