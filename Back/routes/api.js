// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
export const Router = express.Router();
import {Router as userRouter} from './users.js';
import {Router as projectsRouter} from './projects.js';

// Health check or test endpoint for API communication
Router.get('/',(req,res)=>{
    res.json({
        message:"communication from backend"
    })
});

// Mount the projects and users routers under /projects and /users
Router.use('/projects',projectsRouter);
Router.use('/users',userRouter);



