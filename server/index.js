import dotenv from 'dotenv';
dotenv.config();

import express, { Router } from 'express';
import cors from 'cors';

import db from './db/db.js';
import signup from './routes/signup.js';
import login from './routes/login.js';
import saveAnalysis from './routes/saveAnalysis.js';
import getAnalysis from './routes/getAnalysis.js'
import resumeJdMatch from './routes/resumeJdMatch.js'
import getUser from './routes/getUser.js'
import deleteAnalysis from './routes/deleteAnalysis.js'

import authMiddleware from './middleware/authMiddleware.js';

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => {
    await db()
    res.json({ message: 'Hello from server!' });
})

app.use('/signup', signup);
app.use('/login', login);
app.use('/getuser', authMiddleware, getUser);
app.use('/save-analysis', saveAnalysis);
app.use('/getanalysis', getAnalysis)
app.use('/resume-analyzer', resumeJdMatch)
app.use('/delete-analysis', deleteAnalysis)


app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
})