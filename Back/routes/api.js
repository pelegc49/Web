// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
export const Router = express.Router();
import {Router as userRouter} from './users.js';
Router.get('/',(req,res)=>{
    res.json({
        message:"communication from backend"
    })
});

Router.use('/users',userRouter);



