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
            setDoc(data,{
                ...d.data(),
                [req.body.project.name]:req.body.project
            }) 
        }else{
           setDoc(data,{[req.body.project.name]:req.body.project}) 
        }
        res.status(201).send("Saved!")
    }).catch(e=>{
       res.status(500).send("Error: "+e)
    })
    
});

