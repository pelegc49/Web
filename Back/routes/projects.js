import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
import {db} from '../services/firebase.js'; // Import Firebase auth functions
import { doc, getDoc, setDoc } from 'firebase/firestore';
export const Router = express.Router()

Router.post("/",(req,res)=>{
    const data = doc(db,"projects",req.body.user.uid);
    getDoc(data).then(d=>{
        if(d.exists()){

        }else{
           setDoc(data,{[req.body.project.name]:[req.body.project]}) 
        }
    }).catch(e=>{console.log("error: ",e)})
    
});

