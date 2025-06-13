// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
import { Router as apiRouter } from './routes/api.js';

const app = express();
const PORT = 5000;

// Enable CORS for the frontend deployed at the specified Vercel URL
app.use(cors({
  origin: 'https://web-w9fv.vercel.app/', // Only allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Allow cookies and credentials
}))
// Parse incoming JSON requests
app.use(bodyParser.json())

// Start the server and listen on the specified port
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

// Root route for health check or basic response
app.get('/',(req,res)=>{
    res.send('Server responds');
});

// Mount the API router for all /api routes
app.use('/api',apiRouter)