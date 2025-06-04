// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
import { Router as apiRouter } from './routes/api.js';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'https://web-w9fv.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(bodyParser.json())

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.get('/',(req,res)=>{
    res.send('Server responds');
});

app.use('/api',apiRouter)