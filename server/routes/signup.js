import express from 'express';
import User from '../schema/userSchema.js';
import db from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await db(); 
        const existingUser = await User.find({email: email});
        
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        bcrypt.hash(password, 10, async function(err, hash) {
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hash
            })

            await newUser.save();

            const token = jwt.sign({
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            }, process.env.JWT_SECRET);

            res.json({
                message: "User registered successfully",
                status: 200,
                token: token,
                user: {
                    id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email
                }
            })
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;