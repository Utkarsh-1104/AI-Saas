import express from 'express';
import User from '../schema/userSchema.js';
import db from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/', async (req, res) => {
    const {email, password} = req.body;

    try {
        await db();

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.find({email: email});
        if (user.length === 0) {
            return res.status(400).json({ message: "User does not exist" });
        }

        bcrypt.compare(password, user[0].password, function(err, result) {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
            if (!result) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({
                id: user[0]._id,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
                email: user[0].email
            }, process.env.JWT_SECRET);
        
            res.json({
                msg: "User logged in successfully",
                status: 200,
                token: token,
                user: {
                    id: user[0]._id,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email
                }
            })
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;