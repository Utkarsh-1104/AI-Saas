import dotenv from 'dotenv';
dotenv.config();

import express, { Router } from 'express';
import cors from 'cors';

import signup from './routes/signup.js';
import login from './routes/login.js';
import saveAnalysis from './routes/saveAnalysis.js';
import getAnalysis from './routes/getAnalysis.js'
import resumeJdMatch from './routes/resumeJdMatch.js'

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: 'Hello from server!' });
})

app.use('/signup', signup);
app.use('/login', login);
app.use('/save-analysis', saveAnalysis);
app.use('/getanalysis', getAnalysis)
app.use('/resume-analyzer', resumeJdMatch)


app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
})